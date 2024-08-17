import { gql } from "@apollo/client";
import { useUploadImageMutation } from "../../generated/graphql";
gql`
  mutation UploadImage($docs: [ImageUploadInput!]!) {
    uploadImage(docs: $docs) {
      success
    }
  }
`;

export const useUploadImage = () => {
  const [uploadImage, { loading }] = useUploadImageMutation({
    context: {
      headers: {
        "x-apollo-operation-name": "uploadFiles", // Set the operation name header
      },
    },
  });

  return {
    uploadImage,
    loading,
  };
};
