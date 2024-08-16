import React, { useEffect, useRef, useState } from "react";
import { Box, Slider, Button, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopIcon from "@mui/icons-material/Stop";
import { useIsStreamingStore } from "../../zustand/useIsStreamingStore";
import { formatTime } from "../../utils";
import Hls from "hls.js";

interface HLSPlayerProps {
  folder?: string;
  filename?: string;
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({ folder, filename }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isStreaming = useIsStreamingStore((state) => state.setIsStreaming);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (Hls.isSupported() && folder && filename) {
        const hls = new Hls();
        hls.loadSource(
          `https://existent-beings.com/playlist/${folder}/${filename}`
        );
        hls.attachMedia(audio);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {});

        return () => {
          hls.destroy();
        };
      } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
        audio.src = `https://existent-beings.com/playlist/${folder}/${filename}.m3u8`;
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
        isStreaming(true);
        setIsPlaying(true);
      } else {
        audio.pause();
        isStreaming(false);
        setIsPlaying(false);
      }
    }
  };
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const setAudioDuration = () => setDuration(audio.duration);

      // Handler for when the audio ends
      const handleAudioEnd = () => {
        isStreaming(false);
        setIsPlaying(false);
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", setAudioDuration);
      audio.addEventListener("ended", handleAudioEnd); // Listen for audio end

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", setAudioDuration);
        audio.removeEventListener("ended", handleAudioEnd); // Clean up the listener
      };
    }
  }, []);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const audio = audioRef.current;
    const newTime = ((newValue as number) / 100) * duration;
    if (audio) {
      setDuration(audio.duration);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div>
      <Box sx={{ width: 300 }}>
        <audio ref={audioRef} style={{ display: "none" }} />
        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Button onClick={handlePlayPause}>
            {!isPlaying ? <PlayCircleIcon /> : <StopIcon />}
          </Button>
          <Slider
            value={(currentTime / duration) * 100}
            onChange={handleSliderChange}
            sx={{
              height: 8,
              "& .MuiSlider-thumb": { bgcolor: "blue", width: 12, height: 12 },
              "& .MuiSlider-track": { bgcolor: "blue" },
              "& .MuiSlider-rail": { bgcolor: "lightgrey" },
            }}
          />
          <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
            <AccessTimeIcon sx={{ color: "text.secondary", mr: 0.5 }} />
            <Typography variant="body2" color="textSecondary">
              {formatTime(currentTime)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HLSPlayer;
