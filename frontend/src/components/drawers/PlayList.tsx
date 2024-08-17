import { Button, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopIcon from "@mui/icons-material/Stop";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRedeemCode } from "../../data/users/useRedeemCode";
import { useGetRedeemedBooks } from "../../data/users/useGetRedeemedBooks";
import { useUidStore } from "../../zustand/userStore";
import { useAudioStore } from "../../zustand/useAudioStore";
import { RedeemCodeDialog } from "../dialogs/RedeemCode";

const schema = z.object({
  code: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;

export const PlayList = () => {
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
      {/* <form
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
      </form> */}

      <div>
        <Typography
          sx={{ marginTop: 4 }}
          variant="h5"
          align="center"
          gutterBottom
        >
          Library
        </Typography>
        <RedeemCodeDialog>
          <Button>Redeem Code</Button>
        </RedeemCodeDialog>

        <div className="flex flex-col p-1 justify-center">
          {redeemedBooks &&
            redeemedBooks.length &&
            redeemedBooks.map((book) => {
              const folder = book.hls_path ? book.hls_path.split("/")[0] : "";
              const filename = book.hls_path ? book.hls_path.split("/")[1] : "";
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Typography
                    className="text-left w-full"
                    variant="body1"
                    component="p"
                    gutterBottom
                  >
                    {book.title}
                  </Typography>

                  <Button
                    sx={{ padding: 0, margin: 0 }}
                    onClick={() => {
                      handlePlayClick(folder, filename, book.id);
                    }}
                  >
                    {currentBookId === book.id && isPlaying ? (
                      <StopIcon />
                    ) : (
                      <PlayCircleIcon />
                    )}
                  </Button>
                </Box>
              );
            })}
        </div>
      </div>
    </div>
  );
};
