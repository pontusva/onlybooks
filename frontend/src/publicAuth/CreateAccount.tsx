import { auth, db } from "../auth/initAuth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import z from "zod";

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

type Schema = z.infer<typeof schema>;

function CreateAccount() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  console.log("test");
  const onSubmit = async (data: Schema) => {
    const { password, ...dataWithoutPassword } = data;
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (!result) return;
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        if (user) {
          (async () => {
            try {
              await addDoc(collection(db, "users"), {
                ...dataWithoutPassword,
                firebase_uid: user.uid,
                audibookshelfId: result.user.id,
                token: result.user.token,
              });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          })();
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
