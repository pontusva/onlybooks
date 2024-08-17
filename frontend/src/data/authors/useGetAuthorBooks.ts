import { gql } from "@apollo/client";
import {
  useGetAuthorBooksQuery,
  GetAuthorBooksQuery,
} from "../../generated/graphql";

gql`
  query GetAuthorBooks($authorId: ID!) {
    getAuthorBooks(author_id: $authorId) {
      title
      file_name
      id
      author_id
      created_at
      description
      file_url
    }
  }
`;

export const useGetAuthorBooks = ({ authorId }: { authorId: string }) => {
  const { data, loading, refetch } = useGetAuthorBooksQuery({
    skip: !authorId,
    variables: { authorId },
  });

  return {
    books: data?.getAuthorBooks,
    loading,
    refetch,
  };
};

export type AuthorBooks = GetAuthorBooksQuery["getAuthorBooks"];
