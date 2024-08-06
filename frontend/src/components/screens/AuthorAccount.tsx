import { useUidStore } from "../../zustand/userStore";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { db, uploadFile } from "../../auth/initAuth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { CreateNewLibrary } from "../dialogs/CreateNewLibrary";
const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  author: z.string().min(3),
  file: z.instanceof(FileList),
  series: z.string().min(3),
  library: z.string().min(3),
});

type Schema = z.infer<typeof schema>;

interface User {
  createdAt: string;
  firebase_uid: string;
  is_author: boolean;
  id: string;
  username: string;
  libraries: {
    name: string;
    libraryId: string;
    folderId: string;
  }[];
}
export const AuthorAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [library, setLibrary] = useState<string>("");
  const [folderId, setFolderId] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const uid = useUidStore((state) => state.uid);

  const handleChange = (event: SelectChangeEvent) => {
    setLibrary(event.target.value as string);
  };
  const handleFolderId = (folderId: string) => {
    setFolderId(folderId);
  };
  useEffect(() => {
    if (!uid) return;
    (async () => {
      const q = query(
        collection(db, "users"),
        where("firebase_uid", "==", uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        const userData = document.data() as User;
        const userWithId = { ...userData, id: document.id };
        setUser(userWithId);
      });
    })();
  }, [library]);

  const onSubmit = async (data: Schema) => {
    if (!user) return;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("series", data.series);
    formData.append("library", library);
    formData.append("file", data.file[0]);
    formData.append("folder", folderId);
    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });
    const result = await response.text();
    console.log(result);
    uploadFile(data.file[0], async (audio: string) => {
      (async () => {
        try {
          await addDoc(collection(db, "audio"), {
            author_id: user.id,
            author: data.author,
            series: data.series,
            title: data.title,
            description: data.description,
            libraryId: library,
            folderId,
            audio,
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
          {...register("author")}
          id="standard-basic"
          label="Author"
          variant="outlined"
        />
        {errors.author && (
          <span className="text-red-500">{errors.author.message}</span>
        )}
        <TextField
          {...register("series")}
          id="standard-basic"
          label="Author"
          variant="outlined"
        />
        {errors.series && (
          <span className="text-red-500">{errors.series.message}</span>
        )}
        <div>
          <InputLabel id="mediaType-select">Library</InputLabel>
          <Select
            className="w-full"
            id="mediaType-select"
            {...register("library")}
            value={library}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>Select a library</em>
            </MenuItem>
            {user &&
              user.libraries.map((book) => {
                return (
                  <MenuItem
                    key={book.libraryId}
                    value={book.libraryId}
                    onClick={() => handleFolderId(book.folderId)}
                  >
                    {book.name}
                  </MenuItem>
                );
              })}
          </Select>

          {errors.library && (
            <span className="text-red-500">{errors.library.message}</span>
          )}
        </div>
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
