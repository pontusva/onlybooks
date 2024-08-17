import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRedeemCode } from "../../data/users/useRedeemCode";
import { useGetRedeemedBooks } from "../../data/users/useGetRedeemedBooks";
import HLSStream from "../streaming/HLSStream";
import { useUidStore } from "../../zustand/userStore";

const schema = z.object({
  code: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;

export const UserLibrary = () => {
  const firebase_uid = useUidStore((state) => state.uid);
  const { redeemedBooks } = useGetRedeemedBooks({
    firebaseUid: firebase_uid || "",
  });
  const { redeemCode } = useRedeemCode();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Schema) => {
    if (!data.code || !firebase_uid) return;
    redeemCode({
      variables: {
        code: data.code,
        firebaseUid: firebase_uid || "",
      },
    });
  };

  return (
    <div>
      <form
        className="flex items-center justify-center flex-col p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register("code")}
          id="standard-basic"
          label="code"
          variant="outlined"
          style={{ width: "20rem" }}
        />
        {errors.code && (
          <span className="text-red-500">{errors.code.message}</span>
        )}
        <Button type="submit">Redeem Code</Button>
      </form>

      <div>
        <Typography variant="h4" align="center" gutterBottom>
          Redeemed Books
        </Typography>

        <div className="flex flex-col justify-center items-center">
          {redeemedBooks &&
            redeemedBooks.length &&
            redeemedBooks.map((book) => (
              <div key={book.id} className="">
                <Typography variant="h5" component="h3" gutterBottom>
                  {book.title}
                </Typography>

                <HLSStream
                  folder={(book.hls_path && book.hls_path.split("/")[0]) || ""}
                  filename={
                    (book.hls_path && book.hls_path.split("/")[1]) || ""
                  }
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
