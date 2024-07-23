import { useRef } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export const UserDashboard = () => {
  const { load } = useGlobalAudioPlayer();

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
    </div>
  );
};
