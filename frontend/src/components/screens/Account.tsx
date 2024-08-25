import { Chip, Typography } from "@mui/material";
import { UserAccount } from "./UserAccounts";
import { AuthorAccount } from "./AuthorAccount";
import { Loader } from "../reuseable/Loader";
import { useIsAuthor } from "../../data/authors/useIsAuthor";
import { getAuth } from "firebase/auth";

export const Account = () => {
  const auth = getAuth();
  const { isAuthor, loading } = useIsAuthor({
    firebase_uid: auth.currentUser?.uid || "",
  });

  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <>
      <div className="mt-24">
        <Chip
          label={
            <Typography>
              Account: {isAuthor && isAuthor?.is_author ? "Author" : "User"}
            </Typography>
          }
          variant="outlined"
          sx={{
            padding: "8px",
            margin: "8px",
            backgroundColor:
              isAuthor && isAuthor?.is_author ? "lightgreen" : "lightblue",
            color: "black",
            borderRadius: "8px",
            borderColor: isAuthor && isAuthor?.is_author ? "green" : "blue",
          }}
        />
      </div>
      {isAuthor?.is_author ? <AuthorAccount /> : <UserAccount />}
    </>
  );
};
