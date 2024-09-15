import { useGetAuthorQuery } from '@/generated/graphql'
import { gql } from '@apollo/client'

gql`
  query GetAuthor($firebaseUid: String!) {
    getAuthor(firebase_uid: $firebaseUid) {
      bio
      contact_info
      profile_picture_url
      authorid
    }
  }
`

interface GetAuthorProps {
  firebase_uid: string
}
export const useGetAuthor = ({
  firebase_uid
}: GetAuthorProps) => {
  const { data, loading } = useGetAuthorQuery({
    variables: {
      firebaseUid: firebase_uid
    }
  })

  return {
    data,
    loading
  }
}
