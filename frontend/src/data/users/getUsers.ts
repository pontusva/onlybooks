import { gql } from "@apollo/client";
import { useGetUsersQuery } from "../../generated/graphql";

gql`
  query GetUsers {
    users {
      firebase_uid
    }
  }
`;

export const getUsers = () => {
  const { data, loading, refetch } = useGetUsersQuery();

  return {
    users: data?.users,
    loading,
    refetch,
  };
};
