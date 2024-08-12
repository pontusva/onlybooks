import { gql } from "@apollo/client";
import { useInsertHlsNameMutation } from "../../generated/graphql";

gql`
  mutation InsertHlsName($hlsPath: String!, $audioFileId: String!) {
    insertHlsName(hls_path: $hlsPath, audio_file_id: $audioFileId) {
      success
    }
  }
`;

export const useUpdateHlsName = () => {
  const [insertHlsName, { loading }] = useInsertHlsNameMutation({
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    insertHlsName,
    loading,
  };
};
