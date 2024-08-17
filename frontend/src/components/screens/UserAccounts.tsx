import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography, Button } from "@mui/material";
import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useUidStore } from "../../zustand/userStore";
import { useBecomeAuthor } from "../../data/authors/useBecomeAuthor";

export const UserAccount = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-[23rem] pt-3">
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Upgrade to an Author Account!
                </Typography>
                <Typography variant="h5" component="div">
                  Empower Your Writing Journey
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Special Offer for Independent Authors
                </Typography>
                <Typography variant="body2">
                  Join our community of authors and enjoy exclusive benefits:
                  <br /> - Access advanced writing tools
                  <br /> - Promote your books to a larger audience
                  <br /> - Collaborate with other authors
                  <br /> - Participate in writing contests
                  {
                    '"Unlock your potential and share your stories with the world"'
                  }
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={handleClickOpen} size="small">
                  Learn More
                </Button>
              </CardActions>
            </>
          </Card>
        </Box>
      </div>
      <SimpleDialog
        selectedValue={"selectedValue"}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

function SimpleDialog(props: SimpleDialogProps) {
  const uid = useUidStore((state) => state.uid);
  const { onClose, selectedValue, open } = props;
  const { becomeAuthor } = useBecomeAuthor();
  const handleClose = () => {
    onClose(selectedValue);
  };

  const becomeAuthorFunc = async () => {
    becomeAuthor({
      variables: {
        firebaseUid: uid || "",
      },
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Become an Author</DialogTitle>
      <Button onClick={becomeAuthorFunc}>Become Author</Button>
    </Dialog>
  );
}

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}
