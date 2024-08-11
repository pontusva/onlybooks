import { gql } from "@apollo/client";
import { useIsAuthorQuery } from "../../generated/graphql";

gql`
  query IsAuthor($firebaseUid: String!) {
    isAuthor(firebase_uid: $firebaseUid) {
      username
      id
      is_author
    }
  }
`;

export const useIsAuthor = ({ firebase_uid }: { firebase_uid: string }) => {
  const { data, loading, refetch } = useIsAuthorQuery({
    variables: {
      firebaseUid: firebase_uid,
    },
  });
  return {
    isAuthor: data?.isAuthor,
    loading,
    refetch,
  };
};
