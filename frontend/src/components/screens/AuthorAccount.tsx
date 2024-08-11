import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFile } from "../../auth/initAuth";
import { useAuthorIdStore } from "../../zustand/authorIdStore";
import { CreateNewLibrary } from "../dialogs/CreateNewLibrary";
import { useUploadBook } from "../../data/authors/useUploadBook";
const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  file: z.instanceof(FileList),
});

type Schema = z.infer<typeof schema>;

export const AuthorAccount = () => {
  const authorId = useAuthorIdStore((state) => state.authorId);
  const { insertBook } = useUploadBook();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: Schema) => {
    console.log(data);
    uploadFile(data.file[0], async (audio: string) => {
      (async () => {
        try {
          if (!authorId) return;
          insertBook({
            variables: {
              authorId,
              title: data.title,
              fileUrl: audio,
              fileName: data.file[0].name,
              description: data.description,
            },
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })();
    });
  };

  return (
    <>
      <CreateNewLibrary children={<Button>Create new library?</Button>} />
      <form
        className="flex flex-col  h-screen space-y-10 pt-24 p-5"
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
        <TextField
          {...register("file")}
          id="standard-basic"
          type="file"
          variant="outlined"
        />
        {errors.file && (
          <span className="text-red-500">{errors.file.message}</span>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};
