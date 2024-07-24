import { useEffect, useState } from "react";
import { SimpleDialog } from "../reuseable/Dialog";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import { useAuthorIdStore } from "../../zustand/authorIdStore";

export const GenerateUUid = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const authorId = useAuthorIdStore((state) => state.authorId);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateUuid = () => {
    setUuid(uuidv4());
  };

  useEffect(() => {
    (async () => {
      if (!useAuthorIdStore) return;
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
      console.log(result);
    })();
  }, [useAuthorIdStore]);

  return (
    <div>
      <span
        style={{ margin: "0 auto", display: "flex" }}
        onClick={handleClickOpen}
      >
        {children}
      </span>
      <SimpleDialog
        title="Genereate Unique Code"
        open={open}
        onClose={handleClose}
      >
        <Button onClick={generateUuid}>Generate id</Button>
      </SimpleDialog>
    </div>
  );
};
