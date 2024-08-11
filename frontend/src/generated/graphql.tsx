import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AudioFile = {
  __typename?: 'AudioFile';
  author_id: Scalars['ID']['output'];
  created_at: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  file_url: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  becomeAuthor?: Maybe<Response>;
  createUser?: Maybe<Response>;
  insertBook?: Maybe<Response>;
};


export type MutationBecomeAuthorArgs = {
  firebase_uid: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  firebase_uid: Scalars['String']['input'];
  is_author: Scalars['Boolean']['input'];
  username: Scalars['String']['input'];
};


export type MutationInsertBookArgs = {
  author_id: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  file_name: Scalars['String']['input'];
  file_url: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  isAuthor?: Maybe<User>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryIsAuthorArgs = {
  firebase_uid: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Response = {
  __typename?: 'Response';
  success: Scalars['Boolean']['output'];
};

export type UploadBook = {
  __typename?: 'UploadBook';
  author_id: Scalars['ID']['output'];
  created_at: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  file_name: Scalars['String']['output'];
  file_url: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firebase_uid: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_author: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type BecomeAuthorMutationVariables = Exact<{
  firebaseUid: Scalars['String']['input'];
}>;


export type BecomeAuthorMutation = { __typename?: 'Mutation', becomeAuthor?: { __typename?: 'Response', success: boolean } };

export type IsAuthorQueryVariables = Exact<{
  firebaseUid: Scalars['String']['input'];
}>;


export type IsAuthorQuery = { __typename?: 'Query', isAuthor?: { __typename?: 'User', username: string, id: string, is_author: boolean } };

export type InsertBookMutationVariables = Exact<{
  authorId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  fileUrl: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type InsertBookMutation = { __typename?: 'Mutation', insertBook?: { __typename?: 'Response', success: boolean } };

export type CreateUserMutationVariables = Exact<{
  firebaseUid: Scalars['String']['input'];
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  isAuthor: Scalars['Boolean']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'Response', success: boolean } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', firebase_uid: string }> };

export type GetUserByIdQueryVariables = Exact<{
  userByIdId: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', userById?: { __typename?: 'User', firebase_uid: string, is_author: boolean, username: string, id: string } };


export const BecomeAuthorDocument = gql`
    mutation BecomeAuthor($firebaseUid: String!) {
  becomeAuthor(firebase_uid: $firebaseUid) {
    success
  }
}
    `;
export type BecomeAuthorMutationFn = Apollo.MutationFunction<BecomeAuthorMutation, BecomeAuthorMutationVariables>;

/**
 * __useBecomeAuthorMutation__
 *
 * To run a mutation, you first call `useBecomeAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBecomeAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [becomeAuthorMutation, { data, loading, error }] = useBecomeAuthorMutation({
 *   variables: {
 *      firebaseUid: // value for 'firebaseUid'
 *   },
 * });
 */
export function useBecomeAuthorMutation(baseOptions?: Apollo.MutationHookOptions<BecomeAuthorMutation, BecomeAuthorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BecomeAuthorMutation, BecomeAuthorMutationVariables>(BecomeAuthorDocument, options);
      }
export type BecomeAuthorMutationHookResult = ReturnType<typeof useBecomeAuthorMutation>;
export type BecomeAuthorMutationResult = Apollo.MutationResult<BecomeAuthorMutation>;
export type BecomeAuthorMutationOptions = Apollo.BaseMutationOptions<BecomeAuthorMutation, BecomeAuthorMutationVariables>;
export const IsAuthorDocument = gql`
    query IsAuthor($firebaseUid: String!) {
  isAuthor(firebase_uid: $firebaseUid) {
    username
    id
    is_author
  }
}
    `;

/**
 * __useIsAuthorQuery__
 *
 * To run a query within a React component, call `useIsAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsAuthorQuery({
 *   variables: {
 *      firebaseUid: // value for 'firebaseUid'
 *   },
 * });
 */
export function useIsAuthorQuery(baseOptions: Apollo.QueryHookOptions<IsAuthorQuery, IsAuthorQueryVariables> & ({ variables: IsAuthorQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsAuthorQuery, IsAuthorQueryVariables>(IsAuthorDocument, options);
      }
export function useIsAuthorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsAuthorQuery, IsAuthorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsAuthorQuery, IsAuthorQueryVariables>(IsAuthorDocument, options);
        }
export function useIsAuthorSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsAuthorQuery, IsAuthorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsAuthorQuery, IsAuthorQueryVariables>(IsAuthorDocument, options);
        }
export type IsAuthorQueryHookResult = ReturnType<typeof useIsAuthorQuery>;
export type IsAuthorLazyQueryHookResult = ReturnType<typeof useIsAuthorLazyQuery>;
export type IsAuthorSuspenseQueryHookResult = ReturnType<typeof useIsAuthorSuspenseQuery>;
export type IsAuthorQueryResult = Apollo.QueryResult<IsAuthorQuery, IsAuthorQueryVariables>;
export const InsertBookDocument = gql`
    mutation InsertBook($authorId: ID!, $title: String!, $fileUrl: String!, $fileName: String!, $description: String) {
  insertBook(
    author_id: $authorId
    title: $title
    file_url: $fileUrl
    file_name: $fileName
    description: $description
  ) {
    success
  }
}
    `;
export type InsertBookMutationFn = Apollo.MutationFunction<InsertBookMutation, InsertBookMutationVariables>;

/**
 * __useInsertBookMutation__
 *
 * To run a mutation, you first call `useInsertBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertBookMutation, { data, loading, error }] = useInsertBookMutation({
 *   variables: {
 *      authorId: // value for 'authorId'
 *      title: // value for 'title'
 *      fileUrl: // value for 'fileUrl'
 *      fileName: // value for 'fileName'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useInsertBookMutation(baseOptions?: Apollo.MutationHookOptions<InsertBookMutation, InsertBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertBookMutation, InsertBookMutationVariables>(InsertBookDocument, options);
      }
export type InsertBookMutationHookResult = ReturnType<typeof useInsertBookMutation>;
export type InsertBookMutationResult = Apollo.MutationResult<InsertBookMutation>;
export type InsertBookMutationOptions = Apollo.BaseMutationOptions<InsertBookMutation, InsertBookMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($firebaseUid: String!, $username: String!, $email: String!, $isAuthor: Boolean!) {
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
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      firebaseUid: // value for 'firebaseUid'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      isAuthor: // value for 'isAuthor'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    firebase_uid
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($userByIdId: ID!) {
  userById(id: $userByIdId) {
    firebase_uid
    is_author
    username
    id
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      userByIdId: // value for 'userByIdId'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;