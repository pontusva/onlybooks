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
      <div>
        <iframe
          src="https://iframe.mediadelivery.net/embed/280288/185f6d67-9913-49cb-ba6f-bba64ea38616?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
          loading="lazy"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowfullscreen="true"
        ></iframe>
      </div>
      <Button onClick={fetchUser}>Fetch User</Button>
    </div>
  );
};
