import { gql } from "@apollo/client";
import { useGetUserAudioFilesQuery } from "../../generated/graphql";

interface Props {
  firebase_uid: string;
}

gql`
  query GetUserAudioFiles($firebaseUid: String!) {
    getUserAudioFiles(firebase_uid: $firebaseUid) {
      id
      user_id
      purchase_code_id
      audio_file_id
      purchased_at
      audio_title
      audio_description
      audio_file_url
      audio_hls_path
      audio_created_at
    }
  }
`;

export const useGetuserAudioFiles = ({ firebase_uid }: Props) => {
  const { data, loading } = useGetUserAudioFilesQuery({
    skip: !firebase_uid,
    variables: {
      firebaseUid: firebase_uid,
    },
  });

  return {
    data: data?.getUserAudioFiles,
    loading,
  };
};
