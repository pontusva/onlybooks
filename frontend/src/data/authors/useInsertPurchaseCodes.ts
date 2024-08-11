import { gql } from "@apollo/client";
import { useInsertPurchaseCodesMutation } from "../../generated/graphql";

gql`
  mutation InsertPurchaseCodes(
    $authorId: String!
    $code: String!
    $audioFileId: String!
    $expiresAt: String!
    $isRedeemed: Boolean!
  ) {
    insertPurchaseCodes(
      author_id: $authorId
      code: $code
      audio_file_id: $audioFileId
      expires_at: $expiresAt
      is_redeemed: $isRedeemed
    ) {
      success
    }
  }
`;

export const useInsertPurchaseCodes = () => {
  const [insertPurchaseCodes, { loading }] = useInsertPurchaseCodesMutation({
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    insertPurchaseCodes,
    loading,
  };
};
