import { gql } from '@apollo/client'
import {
  useGetAuthorBooksQuery,
  GetAuthorBooksQuery
} from '../../generated/graphql'

gql`
  query GetAuthorBooks($firebaseUid: ID!) {
    getAuthorBooks(firebase_uid: $firebaseUid) {
      id
      author_id
      title
      description
      file_url
      file_name
      created_at
    }
  }
`

export const useGetAuthorBooks = ({
  firebaseUid
}: {
  firebaseUid: string
}) => {
  const { data, loading, refetch } = useGetAuthorBooksQuery(
    {
      skip: !firebaseUid,
      variables: { firebaseUid }
    }
  )

  return {
    books: data?.getAuthorBooks,
    loading,
    refetch
  }
}

export type AuthorBooks =
  GetAuthorBooksQuery['getAuthorBooks']
