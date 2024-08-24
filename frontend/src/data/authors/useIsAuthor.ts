import { gql } from "@apollo/client";
import { useIsAuthorQuery } from "../../generated/graphql";

gql`
  query IsAuthor($firebaseUid: String!) {
    isAuthor(firebase_uid: $firebaseUid) {
      id
      firebase_uid
      username
      email
      is_author
      created_at
    }
  }
`;

export const useIsAuthor = ({ firebase_uid }: { firebase_uid: string }) => {
  const { data, loading, refetch } = useIsAuthorQuery({
    variables: {
      firebaseUid: firebase_uid,
    },
  });

  console.log(data);
  return {
    isAuthor: data?.isAuthor,
    loading,
    refetch,
  };
};
