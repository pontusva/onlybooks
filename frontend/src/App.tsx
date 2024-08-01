import { useEffect } from "react";
import { AppBarTop } from "./components/navigation/appBar.tsx";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUidStore } from "./zustand/userStore.ts";
import { useAuthorIdStore } from "./zustand/authorIdStore.ts";
import { useUserIdStore } from "./zustand/userIdStore.ts";
import { collection, query, where, getDocs } from "firebase/firestore";

import { firebaseApp, auth, db } from "./auth/initAuth.ts";
firebaseApp;

function App() {
  const navigate = useNavigate();
  const setUid = useUidStore((state) => state.setUid);
  const setAuthorId = useAuthorIdStore((state) => state.setAuthorId);
  const setUserId = useUserIdStore((state) => state.setUserId);

  useEffect(() => {
    const fetchUser = async (uid: string) => {
      const q = query(
        collection(db, "users"),
        where("firebase_uid", "==", uid)
      );
      const querySnapshot = await getDocs(q);

      setUserId(querySnapshot.docs[0].id);
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        try {
          const q = query(
            collection(db, "users"),
            where("firebase_uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          if (querySnapshot) {
            setAuthorId(querySnapshot.docs[0].id);
          } else {
            await fetchUser(querySnapshot.docs[0].data().firebase_uid);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      } else {
        setUid(undefined);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate, setUid, setAuthorId]);
  return (
    <>
      <AppBarTop />
      <Outlet />
    </>
  );
}

export default App;
