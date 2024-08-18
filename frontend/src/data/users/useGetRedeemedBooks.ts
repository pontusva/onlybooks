import { gql } from "@apollo/client";
import { useGetRedeemedBooksQuery } from "../../generated/graphql";

interface Props {
  firebaseUid: string;
}

gql`
  query GetRedeemedBooks($firebaseUid: String!) {
    getRedeemedBooks(firebase_uid: $firebaseUid) {
      id
      title
      description
      file_name
      file_url
      hls_path
      cover_image_url
      created_at
      purchased_at
    }
  }
`;

export const useGetRedeemedBooks = ({ firebaseUid }: Props) => {
  const { data, loading, refetch } = useGetRedeemedBooksQuery({
    skip: !firebaseUid,
    variables: { firebaseUid },
  });
  console.log(data);
  return {
    redeemedBooks: data?.getRedeemedBooks,
    loading,
    refetch,
  };
};
