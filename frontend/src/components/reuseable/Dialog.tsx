import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

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
