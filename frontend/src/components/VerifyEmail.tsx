import { Button } from "@mui/material";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useForm } from "react-hook-form";

export const VerifyEmail = () => {
  const auth = getAuth();

  const { register, handleSubmit } = useForm();

  const onSubmit = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await sendEmailVerification(user);
        console.log("Profile updated");
      } catch (error) {
        throw new Error("Profile update failed");
      }
    }
  };

  return (
    <div className="mt-16 flex justify-center items-center flex-col space-y-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit" {...register("verificationEmail")}>
          Send verification email
        </Button>
      </form>
    </div>
  );
};
