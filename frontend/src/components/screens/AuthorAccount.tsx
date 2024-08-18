import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFile } from "../../auth/initAuth";
import { useAuthorIdStore } from "../../zustand/authorIdStore";
import { CreateNewLibrary } from "../dialogs/CreateNewLibrary";
import { useGetAuthorBooks } from "../../data/authors/useGetAuthorBooks";
import { useProcessAudio } from "../../data/authors/useProcessAudio";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  file: z.instanceof(FileList),
  imageFile: z.instanceof(FileList),
});

type Schema = z.infer<typeof schema>;

export const AuthorAccount = () => {
  const authorId = useAuthorIdStore((state) => state.authorId);
  const { books } = useGetAuthorBooks({ authorId: authorId || "" });
  const { processAudio } = useProcessAudio();

  console.log(books);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: Schema) => {
    // Ensure `data.file` contains at least one file
    if (!data.file || data.file.length === 0) {
      console.error("No file provided");
      return;
    }
    console.log(data);
    // Extract the first file
    const file = data.file[0];
    // const imageFile = data.imageFile[0];
    console.log(data.imageFile[0]);
    const docs = Array.from(data.imageFile).map((file) => ({
      file, // This is where the file object goes
      docType: "profilePicture", // Or any docType relevant to your context
    }));

    // try {
    //   const response = await uploadImage({ variables: { docs } });
    //   console.log(response);
    // } catch (error) {
    //   console.error("File upload failed", error);
    // }

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
      <form
        className="flex flex-col  h-screen space-y-6 pt-24 p-5"
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
          <TextField
            {...register("file")}
            id="standard-basic"
            type="file"
            variant="outlined"
          />
          {errors.file && (
            <span className="text-red-500">{errors.file.message}</span>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <span>Upload book cover</span>
          <TextField
            {...register("imageFile")}
            id="standard-basic"
            type="file"
            variant="outlined"
          />
          {errors.imageFile && (
            <span className="text-red-500">{errors.imageFile.message}</span>
          )}
        </Box>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};
