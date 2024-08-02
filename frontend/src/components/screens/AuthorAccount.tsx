import { useUidStore } from "../../zustand/userStore";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { db, uploadFile } from "../../auth/initAuth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  file: z.instanceof(FileList),
});

type Schema = z.infer<typeof schema>;

interface User {
  createdAt: string;
  firebase_uid: string;
  is_author: boolean;
  id: string;
  username: string;
}
export const AuthorAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const uid = useUidStore((state) => state.uid);

  useEffect(() => {
    if (!uid) return;
    (async () => {
      const q = query(
        collection(db, "users"),
        where("firebase_uid", "==", uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        console.log(document);
        const userData = document.data() as User;
        const userWithId = { ...userData, id: document.id };
        setUser(userWithId);
      });
    })();
  }, []);

  const onSubmit = (data: Schema) => {
    if (!user) return;

    uploadFile(data.file[0], async (audio: string) => {
      (async () => {
        try {
          await addDoc(collection(db, "audio"), {
            author_id: user.id,
            title: data.title,
            description: data.description,
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
