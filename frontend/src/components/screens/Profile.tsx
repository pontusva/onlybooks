import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { getAuth, updateEmail } from "firebase/auth";
import { VerifyEmail } from "../VerifyEmail";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateEmail } from "../dialogs/UpdateEmail";

const schema = z.object({
  email: z.string().email(),
});

type Schema = z.infer<typeof schema>;

export const Profile = () => {
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
      <UpdateEmail paddingTop={15}>
        <Button>Update Email</Button>
      </UpdateEmail>
      <VerifyEmail />
    </div>
  );
};
