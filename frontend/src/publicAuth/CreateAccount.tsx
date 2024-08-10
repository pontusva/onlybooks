import { auth } from "../auth/initAuth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useUserCreate } from "../data/users/createUser";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import z from "zod";

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

type Schema = z.infer<typeof schema>;

function CreateAccount() {
  const navigate = useNavigate();
  const { createUser } = useUserCreate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Schema) => {
    const { password, ...dataWithoutPassword } = data;

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        if (user) {
          createUser({
            variables: {
              firebaseUid: user.uid,
              ...dataWithoutPassword,
              isAuthor: false,
            },
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log({ errorCode, errorMessage });
      });
  };

  onAuthStateChanged(auth, (user) => {
    return user && navigate("/");
  });

  return (
    <>
      <form
        className="flex flex-col justify-center h-screen space-y-10 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register("username")}
          id="standard-basic"
          label="username"
          variant="outlined"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
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
}

export default CreateAccount;
