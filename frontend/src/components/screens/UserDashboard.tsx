import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRedeemCode } from "../../data/users/useRedeemCode";
import { useGetRedeemedBooks } from "../../data/users/useGetRedeemedBooks";
import { useUpdateHlsName } from "../../data/users/useUpdateHlsName";
import HLSStream from "../streaming/HLSStream";
import { useUidStore } from "../../zustand/userStore";

const schema = z.object({
  code: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;

export const UserDashboard = () => {
  const firebase_uid = useUidStore((state) => state.uid);
  const { redeemedBooks } = useGetRedeemedBooks({
    firebaseUid: firebase_uid || "",
  });
  const { redeemCode } = useRedeemCode();
  const { insertHlsName } = useUpdateHlsName();
  const [itemId, setItemId] = useState<string>("");
  const [audioToken, setAudioToken] = useState<string>("");
  console.log(redeemedBooks);
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

  const fetchAudio = async (fileName?: string, id?: string) => {
    // File name to be sent to the backend
    // Replace with actual file name logic
    try {
      // First, make a POST request to get the streaming token
      const response = await fetch(`http://localhost:3001/api/request-audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });
      const result = await response.json();
      if (!id) return;

      setItemId(id);
      setAudioToken(result.hlsUrl);
    } catch (error) {
      console.error("Error requesting audio:", error);
    }
  };

  useEffect(() => {
    if (!audioToken || !itemId) return;
    insertHlsName({
      variables: {
        hlsPath: audioToken,
        audioFileId: itemId,
      },
    });
  }, [audioToken, itemId]);

  return (
    <div>
      <form className="flex flex-col p-10" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("code")}
          id="standard-basic"
          label="code"
          variant="outlined"
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
                <Button onClick={() => fetchAudio(book.file_name, book.id)}>
                  Download
                </Button>
                <HLSStream
                  folder={book.hls_path && book.hls_path.split("/")[0]}
                  filename={book.hls_path && book.hls_path.split("/")[1]}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
