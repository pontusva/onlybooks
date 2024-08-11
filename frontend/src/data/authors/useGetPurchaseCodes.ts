import { gql } from "@apollo/client";
import { useGetPurchaseCodesQuery } from "../../generated/graphql";

gql`
  query GetPurchaseCodes($authorId: String!) {
    getPurchaseCodes(author_id: $authorId) {
      is_redeemed
      code
      author_id
      expires_at
      audio_file_id
      title
    }
  }
`;

export const useGetPurchaseCodes = ({ authorId }: { authorId: string }) => {
  const { data, loading, refetch } = useGetPurchaseCodesQuery({
    variables: { authorId },
  });

  return {
    purchaseCodes: data?.getPurchaseCodes,
    loading,
    refetch,
  };
};
