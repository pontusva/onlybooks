import { gql } from "@apollo/client";
import { useProcessAudioMutation } from "../../generated/graphql";

gql`
  mutation ProcessAudio(
    $authorId: ID!
    $title: String!
    $fileUrl: String!
    $fileName: String!
    $description: String
  ) {
    processAudio(
      authorId: $authorId
      title: $title
      fileUrl: $fileUrl
      fileName: $fileName
      description: $description
    ) {
      book {
        id
      }
      hlsUrl
    }
  }
`;

export const useProcessAudio = () => {
  const [processAudio, { loading }] = useProcessAudioMutation({
    refetchQueries: ["GetAuthorBooks"],
    onCompleted: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    processAudio,
    loading,
  };
};
