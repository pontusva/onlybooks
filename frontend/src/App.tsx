import { useEffect } from "react";
import { AppBarTop } from "./components/navigation/appBar.tsx";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUidStore } from "./zustand/userStore.ts";
import { useAuthorIdStore } from "./zustand/authorIdStore.ts";
import { useUserIdStore } from "./zustand/userIdStore.ts";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getUserById } from "./data/users/useGetUserById.ts";
import { firebaseApp, auth, db } from "./auth/initAuth.ts";
firebaseApp;

function App() {
  const navigate = useNavigate();
  const setUid = useUidStore((state) => state.setUid);
  const firebase_uid = useUidStore((state) => state.uid);
  const setAuthorId = useAuthorIdStore((state) => state.setAuthorId);
  const setUserId = useUserIdStore((state) => state.setUserId);

  const { user } = getUserById({
    firebase_uid: firebase_uid ? firebase_uid : "",
  });
  console.log(user);

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
            where("is_author", "==", true),
            where("firebase_uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          const qUser = query(
            collection(db, "users"),
            where("firebase_uid", "==", user.uid)
          );
          const querySnapshotUser = await getDocs(qUser);

          if (!querySnapshot.empty) {
            setAuthorId(querySnapshot.docs[0].id);
          } else if (!querySnapshotUser.empty) {
            await fetchUser(querySnapshotUser.docs[0].data().firebase_uid);
          } else {
            console.error("No matching documents found.");
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
