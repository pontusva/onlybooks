import { gql } from "@apollo/client";
import { useGetPurchaseCodesQuery } from "../../generated/graphql";

gql`
query GetPurchaseCodes($firebaseUid: String!) {
  getPurchaseCodes(firebase_uid: $firebaseUid) {
      is_redeemed
      code
      author_id
      expires_at
      audio_file_id
      title
  }
}
`;

export const useGetPurchaseCodes = ({ firebaseUid }: { firebaseUid: string }) => {
  const { data, loading, refetch } = useGetPurchaseCodesQuery({
    skip: !firebaseUid,
    variables: { firebaseUid },
  });

  return {
    purchaseCodes: data?.getPurchaseCodes,
    loading,
    refetch,
  };
};
