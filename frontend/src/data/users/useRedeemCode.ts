import { gql } from "@apollo/client";
import { useRedeemCodeMutation } from "../../generated/graphql";

gql`
  mutation RedeemCode($code: String!, $userId: String!) {
    redeemCode(code: $code, user_id: $userId) {
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
