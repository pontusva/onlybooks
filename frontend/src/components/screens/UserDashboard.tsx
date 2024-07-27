import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useUserIdStore } from "../../zustand/userIdStore";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";

const schema = z.object({
  code: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;

interface RedeemedBooks {
  redeemedBooks: {
    id: string;
    title: string;
    created_at: string;
    file_url: string;
    description: string;
    purchased_at: string;
  }[];
}

export const UserDashboard = () => {
  const [redeemedBooks, setRedeemedBooks] = useState<RedeemedBooks | null>(
    null
  );
  const [audioFile, setAudioFile] = useState<string>("");
  const userId = useUserIdStore((state) => state.userId);
  const { load } = useGlobalAudioPlayer();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${userId}/purchased`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setRedeemedBooks(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })();
  }, [userId]);

  const onSubmit = async (data: Schema) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/redeem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: data.code,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleBookClick = (fileUrl: string) => {
    setAudioFile(fileUrl);
    if (audioRef.current) {
      audioRef.current.src = `http://localhost:3000/stream/${fileUrl}`;
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }
  };

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
        <List>
          {redeemedBooks &&
            redeemedBooks.redeemedBooks.map((book) => (
              <ListItem key={book.id}>
                <ListItemText primary={book.title} />
                <Button onClick={() => handleBookClick(book.file_url)}>
                  Play
                </Button>
              </ListItem>
            ))}
        </List>
      </div>
      <div className="flex justify-center">
        <audio
          id="audio-player"
          ref={audioRef}
          controls
          onPlay={() => console.log("Audio playing")}
          onPause={() => console.log("Audio paused")}
        >
          <source
            src={audioFile ? `http://localhost:3000/stream/${audioFile}` : ""}
            type="audio/mp3"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};
