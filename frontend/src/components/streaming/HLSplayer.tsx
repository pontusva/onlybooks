import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface HLSPlayerProps {
  folder?: string;
  filename?: string;
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({ folder, filename }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (Hls.isSupported() && folder && filename) {
        const hls = new Hls();
        hls.loadSource(`http://localhost:8888/playlist/${folder}/${filename}`);
        hls.attachMedia(audio);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {});

        return () => {
          hls.destroy();
        };
      } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
        audio.src = `http://localhost:8888/playlist/${folder}/${filename}.m3u8`;
        audio.addEventListener("loadedmetadata", () => {});

        return () => {
          audio.removeEventListener("loadedmetadata", () => {});
        };
      }
    }
  }, [folder, filename]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div>
      <audio ref={audioRef} controls style={{ width: "100%" }} />
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default HLSPlayer;
