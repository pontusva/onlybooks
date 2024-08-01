import { UserDashboard } from "./UserDashboard";
import { useUidStore } from "../../zustand/userStore";
import { useEffect, useState } from "react";
import { AuthorDashboard } from "./AuthorDashboard";
import { Loader } from "../reuseable/Loader";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../auth/initAuth";

export const Dashboard = () => {
  const uid = useUidStore((state) => state.uid);
  const [isAuthor, setIsAuthor] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!uid) return;

      const q = query(
        collection(db, "users"),
        where("firebase_uid", "==", uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        const userData = document.data().is_author;

        setIsAuthor(userData);
      });
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
