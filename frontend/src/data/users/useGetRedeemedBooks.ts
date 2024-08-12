import { gql } from "@apollo/client";
import { useGetRedeemedBooksQuery } from "../../generated/graphql";

interface Props {
  userId: string;
}

gql`
  query GetRedeemedBooks($userId: String!) {
    getRedeemedBooks(user_id: $userId) {
      created_at
      description
      file_name
      file_url
      id
      purchased_at
      title
    }
  }
`;

export const useGetRedeemedBooks = ({ userId }: Props) => {
  const { data, loading, refetch } = useGetRedeemedBooksQuery({
    variables: { userId },
  });

  return {
    redeemedBooks: data?.getRedeemedBooks,
    loading,
    refetch,
  };
};
