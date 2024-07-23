import { Chip, Typography } from "@mui/material";
import { useUidStore } from "../../zustand/userStore";
import { useEffect, useState } from "react";
import { UserAccount } from "./UserAccounts";
import { AuthorAccount } from "./AuthorAccount";
import { Loader } from "../reuseable/Loader";

export const Account = () => {
  const [isAuthor, setIsAuthor] = useState<boolean | undefined>(undefined);
  const uid = useUidStore((state) => state.uid);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/author/${uid}`);

        const result = await response.json();
        setIsAuthor(result.is_author);
        setLoading(false);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    })();
  }, [uid]);
  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  ) : (
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
      {isAuthor ? <AuthorAccount /> : <UserAccount />}
    </>
  );
};
