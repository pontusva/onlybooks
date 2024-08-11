import { UserDashboard } from "./UserDashboard";
import { useUidStore } from "../../zustand/userStore";
import { useEffect } from "react";
import { AuthorDashboard } from "./AuthorDashboard";
import { Loader } from "../reuseable/Loader";

import { useIsAuthor } from "../../data/authors/useIsAuthor";

export const Dashboard = () => {
  const uid = useUidStore((state) => state.uid);

  const { isAuthor, loading } = useIsAuthor({
    firebase_uid: uid || "",
  });

  useEffect(() => {}, [uid]);

  return loading ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loader />
    </div>
  ) : isAuthor ? (
    <AuthorDashboard />
  ) : (
    <UserDashboard />
  );
};
