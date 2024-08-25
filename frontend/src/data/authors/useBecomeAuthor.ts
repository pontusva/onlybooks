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
    onCompleted: () => {},
    onError: () => {},
  });

  return {
    becomeAuthor,
    loading,
  };
};
