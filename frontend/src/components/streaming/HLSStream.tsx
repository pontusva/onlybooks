// import axios from "axios";
// import { useQuery } from "react-query";
// import HLSPlayer from "./HLSplayer";
// import { useIsStreamingStore } from "../../zustand/useIsStreamingStore";
// import { useEffect, useState } from "react";
// import { useAudioStore } from "../../zustand/useAudioStore";

// interface Props {
//   folder: string;
//   filename: string;
// }

// const HLSStream = () => {
//   const isStreaming = useIsStreamingStore((state) => state.isStreaming);
//   const [isQueryEnabled, setIsQueryEnabled] = useState(true);
//   const { folder, filename } = useAudioStore();

//   const { data: playlistData, isLoading } = useQuery(
//     ["playlist", folder, filename],
//     async () => {
//       if (!folder || !filename) return;
//       try {
//         const response = await axios.get(
//           `https://existent-beings.com/playlist/${folder}/${filename}`
//         );
//         return response.data;
//       } catch (error) {
//         console.error("Error fetching playlist:", error);
//         throw error;
//       }
//     },
//     {
//       enabled: isQueryEnabled || isStreaming,
//     }
//   );
//   const { data: segmentData, isLoading: segmentLoading } = useQuery(
//     ["segment", folder, filename],
//     async () => {
//       if (!folder || !filename) return;
//       try {
//         const response = await axios.get(
//           `https://existent-beings.com/segment/${folder}/${filename}`
//         );
//         return response.data;
//       } catch (error) {
//         console.error("Error fetching segment:", error);
//         throw error;
//       }
//     },
//     {
//       enabled: isQueryEnabled || isStreaming,
//     }
//   );

//   console.log({ playlistData, segmentData });
//   useEffect(() => {
//     if (playlistData || segmentData) {
//       setIsQueryEnabled(false);
//     }
//   }, [playlistData, segmentData]);

//   if (isLoading || segmentLoading) return <div>Loading...</div>;
//   if (!playlistData) return <div>Playlist not found.</div>;

//   return <div>{/* <HLSPlayer /> */}</div>;
// };

// export default HLSStream;
