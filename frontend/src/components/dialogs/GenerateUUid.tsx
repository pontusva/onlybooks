import { useEffect, useState } from "react";
import { SimpleDialog } from "../reuseable/Dialog";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import { useAuthorIdStore } from "../../zustand/authorIdStore";
import { useUidStore } from "../../zustand/userStore";

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
  const [books, setBooks] = useState<Books[] | null>(null);
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
        currentBooks?.map((book) =>
          book.id === bookId ? { ...book, uuid: uuidv4() } : book
        ) || []
    );
  };

  const insertCode = async (book: Books) => {
    const response = await fetch(`http://localhost:3000/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author_id: authorId,
        code: book.uuid,
        audio_file_id: book.id,
        expires_at: new Date(),
        firebase_uid: uid,
      }),
    });

    const result = await response.json();
    console.log(result);
  };

  useEffect(() => {
    (async () => {
      if (!authorId) return;

      const response = await fetch(
        `http://localhost:3000/author/${authorId}/books`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      setBooks(result);
    })();
  }, [authorId]);

  useEffect(() => {
    if (selectedBookId !== null) {
      const updatedBook = books?.find((book) => book.id === selectedBookId);
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
          ? books?.map((book) => (
              <div className="" key={book.id}>
                <Button
                  className="flex justify-start text-left w-full truncate"
                  onClick={() => handleGenerateUuid(book.id)}
                >
                  {book.title}
                </Button>
              </div>
            ))
          : null}
      </SimpleDialog>
    </div>
  );
};
