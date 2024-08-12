import { useUserIdStore } from "../../zustand/userIdStore";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { useRedeemCode } from "../../data/users/useRedeemCode";
import { useGetRedeemedBooks } from "../../data/users/useGetRedeemedBooks";
import { useUpdateHlsName } from "../../data/users/useUpdateHlsName";
import ReactPlayer from "react-player";

const schema = z.object({
  code: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;

interface RedeemedBooks {
  author_id: string;
  id: string;
  title: string;
  created_at: string;
  audio: string;
  description: string;
  purchased_at: string;
}

export const UserDashboard = () => {
  const userId = useUserIdStore((state) => state.userId);
  const { redeemedBooks } = useGetRedeemedBooks({ userId: userId || "" });
  const { redeemCode } = useRedeemCode();
  const { insertHlsName } = useUpdateHlsName();
  const [playing, setPlaying] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const [audioFileId, setAudioFileId] = useState<string>("");
  const [audioFile, setAudioFile] = useState<string>("");
  const [itemId, setItemId] = useState<string>("");
  const [contentUrl, setContentUrl] = useState<string>("");
  const [audioToken, setAudioToken] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const audioRef = useRef<HTMLAudioElement>(null);
  console.log(redeemedBooks);
  const onSubmit = async (data: Schema) => {
    if (!data.code || !userId) return;
    redeemCode({
      variables: {
        code: data.code,
        userId,
      },
    });
  };

  const fetchAudio = async (fileName?: string, id?: string) => {
    // File name to be sent to the backend
    // Replace with actual file name logic
    try {
      // First, make a POST request to get the streaming token
      const response = await fetch(`http://localhost:3000/api/request-audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });
      const result = await response.json();

      setItemId(id);
      setAudioToken(result.hlsUrl);
    } catch (error) {
      console.error("Error requesting audio:", error);
    }
  };
  console.log(audioToken, itemId);
  useEffect(() => {
    console.log(audioToken, itemId);

    console.log(audioToken, itemId, "executed");
    insertHlsName({
      variables: {
        hlsPath: audioToken,
        audioFileId: itemId,
      },
    });
  }, [audioToken, itemId]);

  const handleBookClick = (fileUrl: string) => {
    setAudioFile(fileUrl);
    if (audioRef.current) {
      audioRef.current.src = fileUrl;
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }
  };

  useEffect(() => {}, []);

  // useEffect(() => {
  //   (async () => {
  //     if (!audioToken) return;

  //     try {
  //       // Fetch the playlist URL directly if the backend requires it
  //       const response = await fetch(
  //         `http://localhost:3000/api/stream-audio/${audioToken.split("/")[2]}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const playlistUrl = await response.text(); // Fetch the playlist content
  //       setContentUrl(
  //         `http://localhost:3000/api/stream-audio/${audioToken.split("/")[2]}`
  //       );
  //       console.log("Playlist URL:", playlistUrl);
  //     } catch (error) {
  //       console.error("Error fetching playlist:", error);
  //     }
  //   })();
  // }, [audioToken]);

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
        <div className="flex justify-center items-center">
          {redeemedBooks &&
            redeemedBooks.length &&
            redeemedBooks.map((book) => (
              <div key={book.id}>
                <Typography variant="h5" component="h3" gutterBottom>
                  {book.title}
                </Typography>
                <Button onClick={() => fetchAudio(book.file_name, book.id)}>
                  Download
                </Button>
                <ReactPlayer
                  config={{
                    file: {
                      attributes: {
                        onContextMenu: (e) => e.preventDefault(),
                      },
                    },
                  }}
                  url={contentUrl}
                  height={36}
                  width={350}
                  controls
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
