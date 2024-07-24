import { useEffect } from "react";
import { AppBarTop } from "./components/navigation/appBar.tsx";
import { Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUidStore } from "./zustand/userStore.ts";
import { useAuthorIdStore } from "./zustand/authorIdStore.ts";
import { auth } from "./auth/initAuth.ts";

function App() {
  const navigate = useNavigate();
  const setUid = useUidStore((state) => state.setUid);
  const setAuthorId = useAuthorIdStore((state) => state.setAuthorId);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        try {
          const response = await fetch(
            `http://localhost:3000/author/${user.uid}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          setAuthorId(result.id);
          console.log(result.id);
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
