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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import { db } from "../../auth/initAuth";

const schema = z.object({
  code: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;

interface RedeemedBooks {
  id: string;
  title: string;
  created_at: string;
  audio: string;
  description: string;
  purchased_at: string;
}

export const UserDashboard = () => {
  const [redeemedBooks, setRedeemedBooks] = useState<RedeemedBooks[] | null>(
    null
  );
  const [audioFile, setAudioFile] = useState<string>("");
  const userId = useUserIdStore((state) => state.userId);
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
        const userDoc = query(
          collection(db, "Purchases"),
          where("user_id", "==", userId)
        );
        const userSnapshot = await getDocs(userDoc);

        if (!userSnapshot.empty) {
          const redeemedBooksArray = [];

          for (const docs of userSnapshot.docs) {
            const purchaseCodeId = docs.data().purchase_code_id;
            const getRedeemedBooks = doc(db, "PurchaseCodes", purchaseCodeId);
            const redeemedBooksSnapshot = await getDoc(getRedeemedBooks);

            if (redeemedBooksSnapshot.exists()) {
              const redeemedBooksData = redeemedBooksSnapshot.data();
              const getAudioFile = doc(
                db,
                "audio",
                redeemedBooksData.audio_file_id
              );
              const audioFileSnapshot = await getDoc(getAudioFile);

              if (audioFileSnapshot.exists()) {
                redeemedBooksArray.push(
                  audioFileSnapshot.data() as RedeemedBooks
                );
              } else {
                console.log("No such audio file document!");
              }
            } else {
              console.log("No matching redeemed books document found.");
            }
          }
          console.log(redeemedBooksArray);
          setRedeemedBooks(redeemedBooksArray);
        } else {
          console.log("No matching purchases found.");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    })();
  }, [userId]);

  const onSubmit = async (data: Schema) => {
    try {
      const purchaseCodeQuery = query(
        collection(db, "PurchaseCodes"),
        where("code", "==", data.code)
      );
      const querySnapshot = await getDocs(purchaseCodeQuery);

      if (querySnapshot.empty) {
        throw new Error("Code is invalid or already redeemed");
      }

      const purchaseCodeDoc = querySnapshot.docs[0];
      await runTransaction(db, async (transaction) => {
        const purchaseCodeRef = purchaseCodeDoc.ref;

        if (purchaseCodeDoc.data().is_redeemed) {
          throw new Error("Code is invalid or already redeemed");
        }

        transaction.update(purchaseCodeRef, { is_redeemed: true });

        const newPurchaseRef = doc(collection(db, "Purchases"));
        transaction.set(newPurchaseRef, {
          user_id: userId,
          purchase_code_id: purchaseCodeDoc.id,
          audio_file_id: purchaseCodeDoc.data().audio_file_id,
        });

        return newPurchaseRef;
      });

      console.log("Transaction successfully committed!");
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };

  const handleBookClick = (fileUrl: string) => {
    setAudioFile(fileUrl);
    if (audioRef.current) {
      audioRef.current.src = fileUrl;
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
            redeemedBooks.length &&
            redeemedBooks.map((book) => (
              <ListItem key={book.id}>
                <ListItemText primary={book.title} />
                <Button onClick={() => handleBookClick(book.audio)}>
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
          <source src={audioFile ? audioFile : ""} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};
