import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography, Button } from "@mui/material";
import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useAuthorStore } from "../../zustand/authorStore";
import { useUidStore } from "../../zustand/userStore";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "../../auth/initAuth";
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
      <div className="flex flex-col items-center justify-center w-screen h-[20rem] pt-3">
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">{StayUserCard}</Card>
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
  const setIsAuthor = useAuthorStore((state) => state.setIsAuthor);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const becomeAuthor = async () => {
    if (!uid) return;
    const q = query(collection(db, "users"), where("firebase_uid", "==", uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const authorRef = doc(db, "users", document.id);

      await setDoc(authorRef, { is_author: true }, { merge: true });
    });
    if (!querySnapshot.docs[0].data().is_author) return;

    setIsAuthor(querySnapshot.docs[0].data().is_author);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Become an Author</DialogTitle>
      <Button onClick={becomeAuthor}>Become Author</Button>
    </Dialog>
  );
}

const StayUserCard = (
  <>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Enjoy Our Features as a Regular User!
      </Typography>
      <Typography variant="h5" component="div">
        Stay Connected, Stay Informed
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Benefits of Being a Valued User
      </Typography>
      <Typography variant="body2">
        As a regular user, you have access to a range of features:
        <br />
        Browse and read a wide variety of content Follow your favorite authors
        and get updates Participate in discussions and community events Save and
        organize your favorite articles
        {'"Enjoy a seamless and enriching reading experience with us"'}
      </Typography>
    </CardContent>
  </>
);

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}
