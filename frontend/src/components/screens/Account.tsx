import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Chip, Typography } from "@mui/material";
import { UserAccount } from "./UserAccounts";
import { AuthorAccount } from "./AuthorAccount";
import { Loader } from "../reuseable/Loader";
import { useIsAuthor } from "../../data/authors/useIsAuthor";

export const Account = () => {
  const [firebaseUid, setFirebaseUid] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUid(user.uid);
      } else {
        setFirebaseUid(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const { isAuthor, loading } = useIsAuthor({
    firebase_uid: firebaseUid || "",
  });

  if (loading || !firebaseUid) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="mt-24">
        <Chip
          label={
            <Typography>
              Account: {isAuthor && isAuthor.is_author ? "Author" : "User"}
            </Typography>
          }
          variant="outlined"
          sx={{
            padding: "8px",
            margin: "8px",
            backgroundColor:
              isAuthor && isAuthor.is_author ? "lightgreen" : "lightblue",
            color: "black",
            borderRadius: "8px",
            borderColor: isAuthor && isAuthor.is_author ? "green" : "blue",
          }}
        />
      </div>
      {isAuthor?.is_author ? <AuthorAccount /> : <UserAccount />}
    </>
  );
};
