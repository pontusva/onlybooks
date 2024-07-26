import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useUserIdStore } from "../../zustand/userIdStore";
import { Button } from "@mui/material";

export const UserDashboard = () => {
  const userId = useUserIdStore((state) => state.userId);
  const { load } = useGlobalAudioPlayer();

  const redeemCode = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/redeem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: "176e5779-d2d3-43a0-bd91-dcd6562c6eea",
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          load("http://localhost:3000/stream", {
            autoplay: true,
            html5: true,
            format: "mp3",
          });
        }}
      >
        Start Streaming
      </button>
      <Button onClick={redeemCode}>Redeem Code</Button>
    </div>
  );
};
