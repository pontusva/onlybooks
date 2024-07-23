import { Chip, Typography } from "@mui/material";
import { useUidStore } from "../../zustand/userStore";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useAuthorStore } from "../../zustand/authorStore";

export const Account = () => {
  const [open, setOpen] = useState(false);
  const [isAuthor, setIsAuthor] = useState<boolean | undefined>(undefined);
  const uid = useUidStore((state) => state.uid);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!uid) return;
    (async () => {
      const response = await fetch(`http://localhost:3000/author/${uid}`);
      const result = await response.json();
      setIsAuthor(result.is_author);
    })();
  }, []);
  return (
    <>
      <div className="mt-5">
        <Chip
          label={
            <Typography>
              Account status: {isAuthor ? "Author" : "User"}
            </Typography>
          }
          variant="outlined"
        />
      </div>
      {!isAuthor && (
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
                      Join our community of authors and enjoy exclusive
                      benefits:
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
      )}
    </>
  );
};

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

function SimpleDialog(props: SimpleDialogProps) {
  const uid = useUidStore((state) => state.uid);
  const { onClose, selectedValue, open } = props;
  const setIsAuthor = useAuthorStore((state) => state.setIsAuthor);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const becomeAuthor = async () => {
    const response = await fetch("http://localhost:3000/author", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firebase_uid: uid }),
    });
    const result = await response.json();

    if (response.ok) {
      console.log(result);
      setIsAuthor(result.is_author);
    } else {
      console.error(result);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Become an Author</DialogTitle>
      <Button onClick={becomeAuthor}>Become Author</Button>
    </Dialog>
  );
}
