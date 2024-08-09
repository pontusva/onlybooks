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
import { useGlobalAudioPlayer, useAudioPlayer } from "react-use-audio-player";
import ReactPlayer from "react-player";

const schema = z.object({
  // code: z.string().uuid(),
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
  const [redeemedBooks, setRedeemedBooks] = useState<RedeemedBooks[] | null>(
    null
  );
  const [playing, setPlaying] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const [audioFileId, setAudioFileId] = useState<string>("");
  const [audioFile, setAudioFile] = useState<string>("");
  const [itemId, setItemId] = useState<string>("");
  const [contentUrl, setContentUrl] = useState<string>("");
  const [audioToken, setAudioToken] = useState<string>("");
  const userId = useUserIdStore((state) => state.userId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const { play } = useGlobalAudioPlayer();
  const { load } = useAudioPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);

  // useEffect(() => {
  //   if (!userId) return;
  //   (async () => {
  //     try {
  //       const userDoc = query(
  //         collection(db, "Purchases"),
  //         where("user_id", "==", userId)
  //       );
  //       const userSnapshot = await getDocs(userDoc);

  //       if (!userSnapshot.empty) {
  //         const redeemedBooksArray = [];

  //         for (const docs of userSnapshot.docs) {
  //           const purchaseCodeId = docs.data().purchase_code_id;
  //           const getRedeemedBooks = doc(db, "PurchaseCodes", purchaseCodeId);
  //           const redeemedBooksSnapshot = await getDoc(getRedeemedBooks);

  //           if (redeemedBooksSnapshot.exists()) {
  //             const redeemedBooksData = redeemedBooksSnapshot.data();
  //             const getAudioFile = doc(
  //               db,
  //               "audio",
  //               redeemedBooksData.audio_file_id
  //             );
  //             const audioFileSnapshot = await getDoc(getAudioFile);

  //             if (audioFileSnapshot.exists()) {
  //               redeemedBooksArray.push(
  //                 audioFileSnapshot.data() as RedeemedBooks
  //               );
  //             } else {
  //               console.log("No such audio file document!");
  //             }
  //           } else {
  //             console.log("No matching redeemed books document found.");
  //           }
  //         }

  //         setRedeemedBooks(redeemedBooksArray);
  //       } else {
  //         console.log("No matching purchases found.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data: ", error);
  //     }
  //   })();
  // }, [userId]);

  const onSubmit = async (data: Schema) => {
    // try {
    //   const purchaseCodeQuery = query(
    //     collection(db, "PurchaseCodes"),
    //     where("code", "==", data.code)
    //   );
    //   const querySnapshot = await getDocs(purchaseCodeQuery);
    //   if (querySnapshot.empty) {
    //     throw new Error("Code is invalid or already redeemed");
    //   }
    //   const purchaseCodeDoc = querySnapshot.docs[0];
    //   await runTransaction(db, async (transaction) => {
    //     const purchaseCodeRef = purchaseCodeDoc.ref;
    //     if (purchaseCodeDoc.data().is_redeemed) {
    //       throw new Error("Code is invalid or already redeemed");
    //     }
    //     transaction.update(purchaseCodeRef, { is_redeemed: true });
    //     const newPurchaseRef = doc(collection(db, "Purchases"));
    //     transaction.set(newPurchaseRef, {
    //       user_id: userId,
    //       purchase_code_id: purchaseCodeDoc.id,
    //       audio_file_id: purchaseCodeDoc.data().audio_file_id,
    //     });
    //     setAudioFileId(purchaseCodeDoc.data().audio_file_id);
    //     return newPurchaseRef;
    //   });
    //   console.log("Transaction successfully committed!");
    // } catch (error) {
    //   console.error("Transaction failed: ", error);
    // }
    (async () => {
      // File name to be sent to the backend
      const fileName = "Free_Test_Data_5MB_MP3.mp3"; // Replace with actual file name logic

      try {
        // First, make a POST request to get the streaming token
        const response = await fetch(
          `http://localhost:3000/api/request-audio`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileName }),
          }
        );

        const result = await response.json();

        setAudioToken(result.hlsUrl);
      } catch (error) {
        console.error("Error requesting audio:", error);
      }
    })();
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

  // useEffect(() => {
  //   (async () => {
  //     if (!userId) return;
  //     try {
  //       const q = query(
  //         collection(db, "Purchases"),
  //         where("user_id", "==", userId)
  //       );
  //       const querySnapshot = await getDocs(q);

  //       const audioBookRef = doc(
  //         db,
  //         "audio",
  //         querySnapshot.docs[0].data().audio_file_id
  //       ); // Replace 'yourDocumentId' with the actual document ID
  //       const audioBookSnapshot = await getDoc(audioBookRef);

  //       if (audioBookSnapshot.exists()) {
  //         const audioBookData = audioBookSnapshot.data();

  //         const response = await fetch(
  //           `http://localhost:3000/api/libraries/${audioBookData.libraryId}/${audioBookData.title}`
  //         );
  //         const result = await response.json();

  //         setItemId(result.book[0].libraryItem.id);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching document:", error);
  //     }
  //   })();
  // }, [redeemedBooks, audioFileId, userId]);

  // useEffect(() => {
  //   (async () => {
  //     if (!itemId) return;

  //     const response = await fetch(
  //       `http://localhost:3000/api/items/${itemId}/play`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const result = await response.json();
  //     setContentUrl(result.audioTracks[0].contentUrl);
  //   })();
  // }, [itemId, redeemedBooks, audioFileId, userId]);

  // useEffect(() => {
  //   if (!contentUrl) return;
  //   load(`http://localhost:13378/${contentUrl}`, {
  //     loop: true,
  //     format: "mp3",
  //     html5: true,
  //   });
  // }, [load]);

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
              </div>
            ))}
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
      </div>
    </div>
  );
};
