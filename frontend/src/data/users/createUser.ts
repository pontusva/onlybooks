import { gql } from "@apollo/client";
import { useCreateUserMutation } from "../../generated/graphql";

gql`
  mutation CreateUser(
    $firebaseUid: String!
    $username: String!
    $email: String!
    $isAuthor: Boolean!
  ) {
    createUser(
      firebase_uid: $firebaseUid
      username: $username
      email: $email
      is_author: $isAuthor
    ) {
      success
    }
  }
`;

export const useUserCreate = () => {
  const [createUser, { loading }] = useCreateUserMutation({
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    createUser,
    loading,
  };
};
