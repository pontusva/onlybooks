import { Button } from "@mui/material";
import { useUidStore } from "../../zustand/userStore";
import { collection, getDocs, query, where } from "firebase/firestore";

export const Home = () => {
  const uid = useUidStore((state) => state.uid);

  const fetchUser = async () => {};
  return (
    <div className="absolute h-screen flex items-center justify-center w-screen">
      <Button onClick={fetchUser}>Fetch User</Button>
    </div>
  );
};
