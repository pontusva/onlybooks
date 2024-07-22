import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { TextField, Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { auth } from "../auth/initAuth";
import { useEffect } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type Schema = z.infer<typeof schema>;

export const SignIn = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Schema) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <>
      <form
        className="flex flex-col justify-center h-screen space-y-10 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register("email")}
          id="standard-basic"
          label="Email"
          variant="outlined"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <TextField
          {...register("password")}
          id="standard-basic"
          type="password"
          label="password"
          variant="outlined"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};
