import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRedeemCode } from "../../data/users/useRedeemCode";
import { useGetRedeemedBooks } from "../../data/users/useGetRedeemedBooks";
import { useUidStore } from "../../zustand/userStore";
import { useAudioStore } from "../../zustand/useAudioStore";

const schema = z.object({
  code: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;

export const UserLibrary = () => {
  const firebase_uid = useUidStore((state) => state.uid);
  const { setFolderAndFilename, play, stop, currentBookId, isPlaying } =
    useAudioStore();

  const handlePlayClick = (
    folder: string,
    filename: string,
    bookId: string
  ) => {
    if (currentBookId === bookId) {
      // If the clicked book is already playing, toggle play/pause
      isPlaying ? stop() : play();
    } else {
      // If the clicked book is not currently playing, stop the current one and start the new one
      stop();
      setFolderAndFilename(folder, filename, bookId);
      play();
    }
  };
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
            redeemedBooks.map((book) => {
              const folder = book.hls_path ? book.hls_path.split("/")[0] : "";
              const filename = book.hls_path ? book.hls_path.split("/")[1] : "";
              return (
                <div key={book.id} className="flex">
                  <Typography variant="h5" component="h3" gutterBottom>
                    {book.title}
                  </Typography>
                  <Button
                    onClick={() => {
                      handlePlayClick(folder, filename, book.id);
                    }}
                  >
                    {currentBookId === book.id && isPlaying ? "Pause" : "Play"}
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
