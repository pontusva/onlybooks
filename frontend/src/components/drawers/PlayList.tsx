import { Button, Typography, Box } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopIcon from "@mui/icons-material/Stop";
import { useGetRedeemedBooks } from "../../data/users/useGetRedeemedBooks";
import { useAudioStore } from "../../zustand/useAudioStore";
import { RedeemCodeDialog } from "../dialogs/RedeemCode";
import { auth } from "../../auth/initAuth";
import { Loader } from "../reuseable/Loader";

export const PlayList = () => {
  const { setFolderAndFilename, play, stop, currentBookId, isPlaying } =
    useAudioStore();

  const handlePlayClick = (
    folder: string,
    filename: string,
    bookId: string
  ) => {
    if (currentBookId === bookId) {
      isPlaying ? stop() : play();
    } else {
      stop();
      setFolderAndFilename(folder, filename, bookId);
      play();
    }
  };
  const { redeemedBooks, loading } = useGetRedeemedBooks({
    firebaseUid: auth.currentUser?.uid || "",
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Typography
            sx={{ marginTop: 4, color: "#fff" }}
            variant="h5"
            color="inherit"
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
              redeemedBooks.length > 0 &&
              redeemedBooks.map((book) => {
                const folder = book.hls_path ? book.hls_path.split("/")[0] : "";
                const filename = book.hls_path
                  ? book.hls_path.split("/")[1]
                  : "";
                return (
                  <Box
                    key={book.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 1,
                    }}
                  >
                    <Typography
                      className="text-left w-full"
                      variant="body1"
                      color="inherit"
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
      )}
    </>
  );
};
