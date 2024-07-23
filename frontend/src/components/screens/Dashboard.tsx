import { UserDashboard } from "./UserDashboard";
import { useUidStore } from "../../zustand/userStore";
import { useEffect, useState } from "react";
import { AuthorDashboard } from "./AuthorDashboard";
import { Loader } from "../reuseable/Loader";

export const Dashboard = () => {
  const uid = useUidStore((state) => state.uid);
  const [isAuthor, setIsAuthor] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!uid) return;
      const response = await fetch(`http://localhost:3000/author/${uid}`);
      const result = await response.json();
      setIsAuthor(result.is_author);
      setLoading(false);
    })();
  }, [uid]);

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
