import axios from "axios";
import { useQuery } from "react-query";
import HLSPlayer from "./HLSplayer";
import { useIsStreamingStore } from "../../zustand/useIsStreamingStore";
import { useEffect, useState } from "react";

interface Props {
  folder: string;
  filename: string;
}

const HLSStream = ({ folder, filename }: Props) => {
  const isStreaming = useIsStreamingStore((state) => state.isStreaming);
  const [isQueryEnabled, setIsQueryEnabled] = useState(true);

  const { data: playlistData, isLoading } = useQuery(
    ["playlist", folder, filename],
    async () => {
      if (!folder || !filename) return;
      try {
        const response = await axios.get(
          `https://existent-beings.com/playlist/${folder}/${filename}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching playlist:", error);
        throw error;
      }
    },
    {
      enabled: isQueryEnabled || isStreaming,
    }
  );
  const { data: segmentData, isLoading: segmentLoading } = useQuery(
    ["segment", folder, filename],
    async () => {
      if (!folder || !filename) return;
      try {
        const response = await axios.get(
          `https://existent-beings.com/segment/${folder}/${filename}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching segment:", error);
        throw error;
      }
    },
    {
      enabled: isQueryEnabled || isStreaming,
    }
  );

  useEffect(() => {
    if (playlistData || segmentData) {
      setIsQueryEnabled(false);
    }
  }, [playlistData, segmentData]);

  console.log({ playlistData, segmentData });
  if (isLoading || segmentLoading) return <div>Loading...</div>;
  if (!playlistData) return <div>Playlist not found.</div>;

  return (
    <div>
      <HLSPlayer folder={folder} filename={filename} />
    </div>
  );
};

export default HLSStream;
