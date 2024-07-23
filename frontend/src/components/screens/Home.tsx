import { Button } from "@mui/material";
import { useUidStore } from "../../zustand/userStore";

export const Home = () => {
  const uid = useUidStore((state) => state.uid);

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:3000/user/${uid}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div className="absolute h-screen flex items-center justify-center w-screen">
      <Button onClick={fetchUser}>Fetch User</Button>
    </div>
  );
};
