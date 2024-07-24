import { useState } from "react";
import { SimpleDialog } from "../reuseable/Dialog";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";

export const GenerateUUid = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateUuid = () => {
    setUuid(uuidv4());
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
        title="Genereate Unique Code"
        open={open}
        onClose={handleClose}
      >
        <Button onClick={generateUuid}>Generate id</Button>
      </SimpleDialog>
    </div>
  );
};
