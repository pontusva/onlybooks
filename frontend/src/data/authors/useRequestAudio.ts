import { gql } from "@apollo/client";
import { useRequestAudioMutation } from "../../generated/graphql";

gql`
  mutation RequestAudio($audioName: String!) {
    requestAudio(audioName: $audioName) {
      hlsUrl
    }
  }
`;

export const useRequestAudio = () => {
  const [requestAudio, { loading }] = useRequestAudioMutation({
    onCompleted: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    requestAudio,
    loading,
  };
};
