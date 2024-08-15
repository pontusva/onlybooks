import axios from "axios";
import { useQuery } from "react-query";
import HLSPlayer from "./HLSplayer";

interface Props {
  folder: string;
  filename: string;
}

const HLSStream = ({ folder, filename }: Props) => {
  const { data: playlistData, isLoading } = useQuery(
    ["playlist", folder, filename],
    async () => {
      if (!folder || !filename) return;
      try {
        const response = await axios.get(
          `http://localhost:8888/playlist/${folder}/${filename}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching playlist:", error);
        throw error;
      }
    }
  );
  const { data: segmentData, isLoading: segmentLoading } = useQuery(
    ["segment", folder, filename],
    async () => {
      if (!folder || !filename) return;
      try {
        const response = await axios.get(
          `http://localhost:8888/segment/${folder}/${filename}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching segment:", error);
        throw error;
      }
    }
  );

  if (isLoading || segmentLoading) return <div>Loading...</div>;
  if (!playlistData) return <div>Playlist not found.</div>;

  return (
    <div>
      <HLSPlayer folder={folder} filename={filename} />
    </div>
  );
};

export default HLSStream;
