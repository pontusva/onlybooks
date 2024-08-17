import { useEffect } from "react";
import { AppBarTop } from "./components/navigation/appBar.tsx";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUidStore } from "./zustand/userStore.ts";
import { useAuthorIdStore } from "./zustand/authorIdStore.ts";
import { useUserIdStore } from "./zustand/userIdStore.ts";
import { useGetUserById } from "./data/users/useGetUserById.ts";
import { useIsAuthor } from "./data/authors/useIsAuthor.ts";
import { firebaseApp, auth } from "./auth/initAuth.ts";
import HLSPlayer from "./components/streaming/HLSplayer.tsx";
import { LibraryDrawer } from "./components/drawers/LibraryDrawer.tsx";
firebaseApp;

function App() {
  const navigate = useNavigate();
  const setUid = useUidStore((state) => state.setUid);
  const firebase_uid = useUidStore((state) => state.uid);
  const setAuthorId = useAuthorIdStore((state) => state.setAuthorId);
  const setUserId = useUserIdStore((state) => state.setUserId);

  const { user: graphUser } = useGetUserById({
    firebase_uid: firebase_uid || "",
  });
  const { isAuthor } = useIsAuthor({
    firebase_uid: firebase_uid || "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        try {
          if (isAuthor?.is_author) {
            setAuthorId(isAuthor.id);
          } else {
            setUserId(graphUser?.id);
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
  }, [navigate, setUid, setAuthorId, isAuthor, graphUser]);

  return (
    <>
      <AppBarTop />
      <Outlet />
      <LibraryDrawer />
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 mb-10">
        <HLSPlayer />
      </div>
    </>
  );
}

export default App;
