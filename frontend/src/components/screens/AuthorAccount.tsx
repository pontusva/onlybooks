import { Controller, useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFile } from "../../auth/initAuth";
import { useAuthorIdStore } from "../../zustand/authorIdStore";
import { CreateNewLibrary } from "../dialogs/CreateNewLibrary";

import { useProcessAudio } from "../../data/authors/useProcessAudio";

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
  // const { books } = useGetAuthorBooks({ authorId: authorId || "" });
  const { processAudio } = useProcessAudio();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: Schema) => {
    // Ensure `data.file` contains at least one file
    console.log(data);
    if (!data.file || data.file.length === 0) {
      console.error("No file provided");
      return;
    }
    console.log(data);
    // Extract the first file
    const file = data.file[0];
    // const imageFile = data.imageFile[0];
    if (!data.imageFile) return null;
    const docs = Array.from(data?.imageFile).map((file) => ({
      file, // This is where the file object goes
      docType: "profilePicture", // Or any docType relevant to your context
    }));

    try {
      // Call uploadFile and handle the result
      uploadFile(file, async (audio: string) => {
        try {
          // Ensure authorId is available
          if (!authorId) {
            throw new Error("Author ID is missing");
          }

          // Call processAudio with the correct variables
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

          // Additional logic or state updates can go here
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
      <CreateNewLibrary children={<Button>Create new library?</Button>} />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <form
          className="flex flex-col w-96 h-screen space-y-6 pt-24 p-5"
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
            <span>Upload audio file</span>
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
            <span>Upload book cover</span>
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
                    startIcon={<CloudUploadIcon />}
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
