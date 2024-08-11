import { Chip, Typography } from "@mui/material";
import { useUidStore } from "../../zustand/userStore";
import { UserAccount } from "./UserAccounts";
import { AuthorAccount } from "./AuthorAccount";
import { Loader } from "../reuseable/Loader";
import { useIsAuthor } from "../../data/authors/useIsAuthor";
import { useAuthorIdStore } from "../../zustand/authorIdStore";

export const Account = () => {
  const uid = useUidStore((state) => state.uid);
  const authorId = useAuthorIdStore((state) => state.authorId);
  console.log(authorId);
  const { isAuthor, loading } = useIsAuthor({
    firebase_uid: uid || "",
  });

  return loading || !isAuthor ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <>
      <div className="mt-5">
        <Chip
          label={
            <Typography>
              Account status: {isAuthor?.is_author ? "Author" : "User"}
            </Typography>
          }
          variant="outlined"
        />
      </div>
      {isAuthor?.is_author ? <AuthorAccount /> : <UserAccount />}
    </>
  );
};
