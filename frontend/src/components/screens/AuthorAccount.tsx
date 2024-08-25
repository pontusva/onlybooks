import { Controller, useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, Slider } from "@mui/material";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadFile } from "../../misc/useUploadFile";
import { useAuthorIdStore } from "../../zustand/authorIdStore";
import { useProcessAudio } from "../../data/authors/useProcessAudio";
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  file: z.instanceof(FileList).optional(),
  imageFile: z.instanceof(FileList).optional(),
});

type Schema = z.infer<typeof schema>;

export const AuthorAccount = () => {
  const authorId = useAuthorIdStore((state) => state.authorId);
  const { processAudio } = useProcessAudio();
  const { uploadProgress, startUpload } = useUploadFile();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Schema) => {
    if (!data.file || data.file.length === 0) {
      console.error("No file provided");
      return;
    }
    const file = data.file[0];
    if (!data.imageFile) return;

    const docs = Array.from(data.imageFile).map((file) => ({
      file,
      docType: "profilePicture",
    }));

    try {
      startUpload(file, async (audio: string) => {
        try {
          if (!authorId) {
            throw new Error("Author ID is missing");
          }

          const result = await processAudio({
            variables: {
              authorId,
              title: data.title,
              description: data.description,
              fileUrl: audio,
              fileName: file.name,
              docs,
            },
          });

          console.log("Process Audio Result:", result);
        } catch (error) {
          console.error("Error processing audio:", error);
        }
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <form
          className="flex flex-col w-full h-screen space-y-6 pt-24 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            {...register("title")}
            id="standard-basic"
            label="Title"
            variant="outlined"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}

          <TextField
            {...register("description")}
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={4}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {uploadProgress !== null && uploadProgress < 100 && (
              <>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Upload Progress: {Math.round(uploadProgress)}%
                </Typography>
                <Slider
                  value={uploadProgress}
                  max={100}
                  step={1}
                  disabled
                  valueLabelDisplay="on"
                  sx={{
                    mt: 2,
                    "& .MuiSlider-thumb": {
                      display: "none", // Hide the thumb for a cleaner look
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "#3f51b5", // Customize the track color
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#b0bec5", // Customize the rail color
                    },
                  }}
                />
              </>
            )}

            <input type="file" style={{ display: "none" }} />

            <Controller
              name="file"
              control={control}
              render={({ field: { onChange, onBlur, ref } }) => (
                <>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload audio file
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (!e.target.files) return;
                        if (e?.target?.files?.length > 0) {
                          onChange(e.target.files);
                        }
                      }}
                      onBlur={onBlur}
                      ref={ref}
                    />
                  </Button>
                </>
              )}
            />
            {errors.file && (
              <span className="text-red-500">{errors.file.message}</span>
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Controller
              name="imageFile"
              control={control}
              render={({ field: { onChange, onBlur, ref } }) => (
                <>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<ImageIcon />}
                  >
                    Upload cover image
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (!e.target.files) return;
                        if (e.target.files.length > 0) {
                          onChange(e.target.files);
                        }
                      }}
                      onBlur={onBlur}
                      ref={ref}
                    />
                  </Button>
                </>
              )}
            />
            {errors.imageFile && (
              <span className="text-red-500">{errors.imageFile.message}</span>
            )}
          </Box>

          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </>
  );
};
