import { useEffect } from "react";
import { AppBarTop } from "./components/navigation/appBar.tsx";
import { Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUidStore } from "./zustand/userStore.ts";
import { auth } from "./auth/initAuth.ts";

function App() {
  const navigate = useNavigate();
  const setUid = useUidStore((state) => state.setUid);

  useEffect(() => {
    const user = getAuth();
    if (user.currentUser?.uid) {
      setUid(user.currentUser.uid);
    } else {
      setUid(undefined);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate, setUid]);

  return (
    <>
      <AppBarTop />
      <Outlet />
    </>
  );
}

export default App;
