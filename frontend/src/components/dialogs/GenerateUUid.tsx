import { useEffect, useState } from "react";
import { SimpleDialog } from "../reuseable/Dialog";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import { useAuthorIdStore } from "../../zustand/authorIdStore";
import { useUidStore } from "../../zustand/userStore";
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
  addDoc,
} from "firebase/firestore";
import { db } from "../../auth/initAuth";

interface Books {
  author_id: string;
  created_at: string;
  description: string;
  file_url: string;
  id: number;
  title: string;
  uuid: string;
}

export const GenerateUuid = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const authorId = useAuthorIdStore((state) => state.authorId);
  const [books, setBooks] = useState<DocumentData | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const uid = useUidStore((state) => state.uid);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateUuid = (bookId: number) => {
    setBooks(
      (currentBooks) =>
        currentBooks?.map((book: Books) =>
          book.id === bookId ? { ...book, uuid: uuidv4() } : book
        ) || []
    );
  };

  const insertCode = async (book: Books) => {
    try {
      const docRef = await addDoc(collection(db, "PurchaseCodes"), {
        author_id: authorId,
        code: book.uuid,
        title: book.title,
        audio_file_id: book.id,
        expires_at: new Date(),
        firebase_uid: uid,
        is_redeemed: false,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    (async () => {
      if (!authorId) return;

      const q = query(
        collection(db, "audio"),
        where("author_id", "==", authorId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          console.log(document.data());
          const booksArray = querySnapshot.docs.map((document) => ({
            ...document.data(),
            id: document.id,
          }));
          setBooks(booksArray);
        });
      } else {
        // Handle the case where no documents are found
        setBooks([]);
      }
    })();
  }, [authorId]);

  useEffect(() => {
    if (selectedBookId !== null) {
      const updatedBook = books?.find(
        (book: Books) => book.id === selectedBookId
      );
      if (updatedBook) {
        insertCode(updatedBook);
      }
      setSelectedBookId(null);
    }
  }, [books]);

  const handleGenerateUuid = (bookId: number) => {
    setSelectedBookId(bookId);
    generateUuid(bookId);
  };
  console.log(books);
  return (
    <div>
      <span
        style={{ margin: "0 auto", display: "flex" }}
        onClick={handleClickOpen}
      >
        {children}
      </span>
      <SimpleDialog
        title="Generate Unique Code"
        open={open}
        onClose={handleClose}
      >
        {books && books.length
          ? books?.map((book: Books) => {
              return (
                <div className="" key={book.id}>
                  <Button
                    className="flex justify-start text-left w-full truncate"
                    onClick={() => handleGenerateUuid(book.id)}
                  >
                    {book.title}
                  </Button>
                </div>
              );
            })
          : null}
      </SimpleDialog>
    </div>
  );
};
