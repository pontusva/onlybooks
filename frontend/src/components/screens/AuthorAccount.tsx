import { useUidStore } from "../../zustand/userStore";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  file: z.instanceof(FileList),
});

type Schema = z.infer<typeof schema>;
interface User {
  user: {
    createdAt: string;
    firebase_uid: string;
    is_author: boolean;
    id: number;
    username: string;
  };
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
      const response = await fetch(`http://localhost:3000/user/${uid}`);
      const result = await response.json();
      setUser(result);
    })();
  }, []);

  const onSubmit = (data: Schema) => {
    if (!user) return;
    const formData = new FormData();
    formData.append("author_id", String(user?.user.id));
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("audio", data.file[0]);
    fetch(`http://localhost:3000/audio/upload`, {
      method: "POST",
      body: formData,
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
