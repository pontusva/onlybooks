import { gql } from "@apollo/client";
import { useGetUserByIdQuery } from "../../generated/graphql";

interface Props {
  firebase_uid: string;
}

gql`
  query GetUserById($userByIdId: ID!) {
    userById(id: $userByIdId) {
      firebase_uid
      is_author
      username
      id
    }
  }
`;

export const useGetUserById = ({ firebase_uid }: Props) => {
  const { data, loading, refetch } = useGetUserByIdQuery({
    variables: {
      userByIdId: firebase_uid,
    },
  });

  return {
    user: data?.userById,
    loading,
    refetch,
  };
};
