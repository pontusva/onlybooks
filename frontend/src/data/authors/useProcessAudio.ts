import { gql } from "@apollo/client";
import { useProcessAudioMutation } from "../../generated/graphql";

gql`
  mutation ProcessAudio(
    $authorId: ID!
    $title: String!
    $fileUrl: String!
    $fileName: String!
    $docs: [ImageUploadInput!]
    $description: String
  ) {
    processAudio(
      authorId: $authorId
      title: $title
      fileUrl: $fileUrl
      fileName: $fileName
      docs: $docs
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
    context: {
      headers: {
        "x-apollo-operation-name": "uploadFiles",
      },
    },
  });

  return {
    processAudio,
    loading,
  };
};
