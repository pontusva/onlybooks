import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFile } from "../../auth/initAuth";
import { useAuthorIdStore } from "../../zustand/authorIdStore";
import { CreateNewLibrary } from "../dialogs/CreateNewLibrary";
import { useUploadBook } from "../../data/authors/useUploadBook";
import { useGetAuthorBooks } from "../../data/authors/useGetAuthorBooks";
import { useUpdateHlsName } from "../../data/users/useUpdateHlsName";
import { useState } from "react";
const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  file: z.instanceof(FileList),
});

type Schema = z.infer<typeof schema>;

export const AuthorAccount = () => {
  const authorId = useAuthorIdStore((state) => state.authorId);
  const { insertHlsName } = useUpdateHlsName();
  const [itemId, setItemId] = useState<string>("");
  const [audioToken, setAudioToken] = useState<string>("");
  const { books } = useGetAuthorBooks({ authorId: authorId || "" });
  console.log(books);
  const { insertBook } = useUploadBook();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: Schema) => {
    uploadFile(data.file[0], async (audio: string) => {
      try {
        if (!authorId) return;

        const insertBookResponse = await insertBook({
          variables: {
            authorId,
            title: data.title,
            fileUrl: audio,
            fileName: data.file[0].name,
            description: data.description,
          },
        });

        const newBookId = insertBookResponse?.data?.insertBook?.id;
        console.log(insertBookResponse);
        if (!newBookId) {
          throw new Error("Failed to retrieve new book ID");
        }

        try {
          const response = await fetch(
            `http://localhost:3001/api/request-audio`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ fileName: data.file[0].name }),
            }
          );

          const result = await response.json();
          console.log(result);

          await insertHlsName({
            variables: {
              hlsPath: result.hlsUrl,
              audioFileId: newBookId,
            },
          });
        } catch (error) {
          console.error("Error requesting audio:", error);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
