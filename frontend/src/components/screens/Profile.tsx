import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { getAuth, updateEmail } from "firebase/auth";
import { VerifyEmail } from "../VerifyEmail";

import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

type Schema = z.infer<typeof schema>;

export const Profile = () => {
  const auth = getAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Schema) => {
    const user = auth.currentUser;

    if (user) {
      try {
        await updateEmail(user, data.email || user.email || "");
        console.log("Profile updated");
      } catch (error) {
        throw new Error("Profile update failed");
      }
    }
  };

  return (
    <div className="mt-16 flex flex-col space-y-5">
      <Typography
        sx={{
          fontWeight: 500,
          color: "inherit",
        }}
        align="center"
      >
        Profile
      </Typography>
      <div className="flex  justify-center">
        <Avatar
          sx={{ width: 100, height: 100 }}
          src="/c5f4946c-e495-4003-aeff-20710a9a920a.png"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center space-y-5">
          <div className="flex flex-col">
            <TextField
              {...register("email")}
              label="email"
              variant="outlined"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <Button type="submit"> Update email</Button>
        </div>
      </form>
      <VerifyEmail />
    </div>
  );
};
