// import { gql } from "@apollo/client";
// import { useInsertBookMutation } from "../../generated/graphql";

// gql`
//   mutation InsertBook(
//     $authorId: ID!
//     $title: String!
//     $fileUrl: String!
//     $fileName: String!
//     $description: String
//   ) {
//     insertBook(
//       author_id: $authorId
//       title: $title
//       file_url: $fileUrl
//       file_name: $fileName
//       description: $description
//     ) {
//       id
//     }
//   }
// `;

// export const useUploadBook = () => {
//   const [insertBook, { loading }] = useInsertBookMutation({
//     onCompleted: (data) => {
//       console.log(data);
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });

//   return {
//     insertBook,
//     loading,
//   };
// };
