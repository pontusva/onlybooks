import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Box } from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export const SimpleDialog = ({
  onClose,

  open,
  children,
  title,
}: SimpleDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};
