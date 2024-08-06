import { Button } from "@mui/material";
import { useUidStore } from "../../zustand/userStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../auth/initAuth";

export const Home = () => {
  const uid = useUidStore((state) => state.uid);

  const fetchUser = async () => {
    const q = query(collection(db, "users"), where("firebase_uid", "==", uid));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs[0].data());
  };
  return (
    <div className="absolute h-screen flex items-center justify-center w-screen">
      <Button onClick={fetchUser}>Fetch User</Button>
    </div>
  );
};
