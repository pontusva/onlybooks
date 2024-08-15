import { gql } from "@apollo/client";
import { useRedeemCodeMutation } from "../../generated/graphql";

gql`
  mutation RedeemCode($code: String!, $firebaseUid: String!) {
    redeemCode(code: $code, firebase_uid: $firebaseUid) {
      success
    }
  }
`;

export const useRedeemCode = () => {
  const [redeemCode, { loading }] = useRedeemCodeMutation({
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    redeemCode,
    loading,
  };
};
