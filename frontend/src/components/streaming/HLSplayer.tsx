import React, { useEffect, useRef, useState } from "react";
import { Box, Slider, Button, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import { formatTime } from "../../utils";
import Hls from "hls.js";
import { useAudioStore } from "../../zustand/useAudioStore";

interface HLSPlayerProps {
  folder?: string;
  filename?: string;
}

const HLSPlayer: React.FC<HLSPlayerProps> = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { folder, filename, isPlaying, togglePlayPause, setIsPlaying } =
    useAudioStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume is 1 (100%)

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
        audio.src = `https://existent-beings.com/playlist/${folder}/${filename}`;
      }
    }
  }, [folder, filename]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.play().catch((error) => console.error("Playback error:", error));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, folder, filename]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      // Ensure the volume value is a finite number between 0 and 1
      const validVolume = Number.isFinite(volume)
        ? Math.max(0, Math.min(1, volume))
        : 1;
      audio.volume = validVolume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const setAudioDuration = () => setDuration(audio.duration);

      const handleAudioEnd = () => {
        setIsPlaying(false);
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", setAudioDuration);
      audio.addEventListener("ended", handleAudioEnd);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", setAudioDuration);
        audio.removeEventListener("ended", handleAudioEnd);
      };
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      // Ensure the volume value is a finite number between 0 and 1
      const validVolume = Number.isFinite(volume)
        ? Math.max(0, Math.min(1, volume))
        : 1;
      audio.volume = validVolume;
    }
  }, [volume]);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const audio = audioRef.current;
    const newTime = ((newValue as number) / 100) * duration;
    if (audio) {
      setDuration(audio.duration);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    // Convert slider value (0-100) to volume range (0.0-1.0)
    const newVolume = (newValue as number) / 100;
    setVolume(newVolume);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />
      <div className="flex flex-col">
        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Button disabled={!folder || !filename} onClick={togglePlayPause}>
            {!isPlaying ? <PlayCircleIcon /> : <StopIcon />}
          </Button>
          <Slider
            value={(currentTime / duration) * 100}
            onChange={handleSliderChange}
            sx={{
              height: 8,
              width: 100,
              "& .MuiSlider-thumb": {
                bgcolor: "#0A122A",
                width: 12,
                height: 12,
              },
              "& .MuiSlider-track": { bgcolor: "#D3D3D3", border: "none" },
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          {volume === 0 ? <VolumeMuteIcon /> : <VolumeUpIcon />}
          <Slider
            value={volume * 100} // Convert 0.0-1.0 to 0-100
            onChange={handleVolumeChange}
            // orientation="vertical"
            sx={{
              width: 75,
              height: 8,
              "& .MuiSlider-thumb": {
                bgcolor: "#0A122A",
                width: 12,
                height: 12,
              },
              "& .MuiSlider-track": { bgcolor: "#F5F5DC", border: "none" },
              "& .MuiSlider-rail": { bgcolor: "lightgrey" },
            }}
          />
        </Box>
      </div>
    </Box>
  );
};

export default HLSPlayer;

// import React, { useEffect, useRef, useState } from "react";
// import { Box, Slider, Button, Typography } from "@mui/material";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import PlayCircleIcon from "@mui/icons-material/PlayCircle";
// import StopIcon from "@mui/icons-material/Stop";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
// import { formatTime } from "../../utils";
// import Hls from "hls.js";
// import { useAudioStore } from "../../zustand/useAudioStore";

// interface HLSPlayerProps {
//   folder?: string;
//   filename?: string;
// }

// const HLSPlayer: React.FC<HLSPlayerProps> = () => {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const { folder, filename, isPlaying, togglePlayPause, setIsPlaying } =
//     useAudioStore();
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1); // Default volume is 1 (100%)

//   useEffect(() => {
//     const audio = audioRef.current;

//     if (audio) {
//       if (Hls.isSupported() && folder && filename) {
//         const hls = new Hls();
//         hls.loadSource(
//           `https://existent-beings.com/playlist/${folder}/${filename}`
//         );
//         hls.attachMedia(audio);
//         hls.on(Hls.Events.MANIFEST_PARSED, () => {});

//         return () => {
//           hls.destroy();
//         };
//       } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
//         audio.src = `https://existent-beings.com/playlist/${folder}/${filename}`;
//       }
//     }
//   }, [folder, filename]);

//   useEffect(() => {
//     const audio = audioRef.current;

//     if (audio) {
//       if (isPlaying) {
//         audio.play().catch((error) => console.error("Playback error:", error));
//       } else {
//         audio.pause();
//       }
//     }
//   }, [isPlaying, folder, filename]);

//   useEffect(() => {
//     const audio = audioRef.current;

//     if (audio) {
//       // Ensure the volume value is a finite number between 0 and 1
//       const validVolume = Number.isFinite(volume)
//         ? Math.max(0, Math.min(1, volume))
//         : 1;
//       audio.volume = validVolume;
//     }
//   }, [volume]);

//   useEffect(() => {
//     const audio = audioRef.current;

//     if (audio) {
//       const updateTime = () => setCurrentTime(audio.currentTime);
//       const setAudioDuration = () => setDuration(audio.duration);

//       const handleAudioEnd = () => {
//         setIsPlaying(false);
//       };

//       audio.addEventListener("timeupdate", updateTime);
//       audio.addEventListener("loadedmetadata", setAudioDuration);
//       audio.addEventListener("ended", handleAudioEnd);

//       return () => {
//         audio.removeEventListener("timeupdate", updateTime);
//         audio.removeEventListener("loadedmetadata", setAudioDuration);
//         audio.removeEventListener("ended", handleAudioEnd);
//       };
//     }
//   }, []);

//   const handleSliderChange = (event: Event, newValue: number | number[]) => {
//     const audio = audioRef.current;
//     const newTime = ((newValue as number) / 100) * duration;
//     if (audio) {
//       setDuration(audio.duration);
//       audio.currentTime = newTime;
//       setCurrentTime(newTime);
//     }
//   };

//   const handleVolumeChange = (event: Event, newValue: number | number[]) => {
//     const newVolume = (newValue as number) / 100; // Convert 0-100 to 0.0-1.0
//     setVolume(newVolume);
//   };

//   return (
//     <div>
//       <Box sx={{ width: "100%" }}>
//         <audio ref={audioRef} style={{ display: "none" }} />
//         <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
//           <Button disabled={!folder || !filename} onClick={togglePlayPause}>
//             {!isPlaying ? <PlayCircleIcon /> : <StopIcon />}
//           </Button>
//           <Slider
//             value={(currentTime / duration) * 100}
//             onChange={handleSliderChange}
//             sx={{
//               flexGrow: 1,
//               height: 8,
//               "& .MuiSlider-thumb": { bgcolor: "blue", width: 12, height: 12 },
//               "& .MuiSlider-track": { bgcolor: "blue" },
//               "& .MuiSlider-rail": { bgcolor: "lightgrey" },
//             }}
//           />
//           <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
//             <AccessTimeIcon sx={{ color: "text.secondary", mr: 0.5 }} />
//             <Typography variant="body2" color="textSecondary">
//               {formatTime(currentTime)}
//             </Typography>
//           </Box>
//           <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
//             {volume === 0 ? <VolumeMuteIcon /> : <VolumeUpIcon />}
//             <Slider
//               value={volume * 100} // Convert 0.0-1.0 to 0-100
//               onChange={handleVolumeChange}
//               sx={{
//                 width: 100,
//                 height: 8,
//                 "& .MuiSlider-thumb": {
//                   bgcolor: "blue",
//                   width: 12,
//                   height: 12,
//                 },
//                 "& .MuiSlider-track": { bgcolor: "blue" },
//                 "& .MuiSlider-rail": { bgcolor: "lightgrey" },
//                 ml: 1,
//               }}
//             />
//           </Box>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default HLSPlayer;
