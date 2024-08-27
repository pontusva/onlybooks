import { TextField, Button } from "@mui/material";
import { SimpleDialog } from "../reuseable/Dialog";
import { ReactNode, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getAuth, updateEmail } from "firebase/auth";

interface Props {
  children: ReactNode;
  paddingTop?: number;
}

const schema = z.object({
  email: z.string().email(),
});

type Schema = z.infer<typeof schema>;

export const UpdateEmail = ({ children, paddingTop }: Props) => {
  const [open, setOpen] = useState(false);
  const auth = getAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <>
      <span
        style={{
          margin: "0 auto",
          paddingTop,
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
        onClick={handleClickOpen}
      >
        {children}
      </span>
      <SimpleDialog open={open} onClose={handleClose} title="Update Email">
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
            <Button type="submit">Update email</Button>
          </div>
        </form>
      </SimpleDialog>
    </>
  );
};
