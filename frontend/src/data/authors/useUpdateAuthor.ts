import { gql } from '@apollo/client'
import { useUpdateAuthorMutation } from '@/generated/graphql'

gql`
  mutation UpdateAuthor(
    $firebaseUid: String!
    $bio: String
    $profilePictureUrl: String
    $contactInfo: String
  ) {
    updateAuthor(
      firebase_uid: $firebaseUid
      bio: $bio
      profile_picture_url: $profilePictureUrl
      contact_info: $contactInfo
    ) {
      authorid
    }
  }
`

export const useUpdateAuthor = () => {
  const [updateAuthor, { loading }] =
    useUpdateAuthorMutation({
      onCompleted: (data) => {
        console.log({ data })
      },
      onError: (error) => {
        console.error(error)
      }
    })

  return {
    updateAuthor,
    loading
  }
}
