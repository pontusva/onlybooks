import { gql } from "@apollo/client";
import { useBecomeAuthorMutation } from "../../generated/graphql";
gql`
  mutation BecomeAuthor($firebaseUid: String!) {
    becomeAuthor(firebase_uid: $firebaseUid) {
      success
    }
  }
`;

export const useBecomeAuthor = () => {
  const [becomeAuthor, { loading }] = useBecomeAuthorMutation({
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    becomeAuthor,
    loading,
  };
};
