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
  Upload: { input: any; output: any; }
};

export type AudioFile = {
  __typename?: 'AudioFile';
  audio_created_at: Scalars['String']['output'];
  audio_description?: Maybe<Scalars['String']['output']>;
  audio_file_id: Scalars['String']['output'];
  audio_file_url: Scalars['String']['output'];
  audio_hls_path?: Maybe<Scalars['String']['output']>;
  audio_title: Scalars['String']['output'];
  book?: Maybe<InsertBookResponse>;
  hlsUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  purchase_code_id: Scalars['String']['output'];
  purchased_at: Scalars['String']['output'];
  user_id: Scalars['String']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: GraphqlUser;
};

export type CombinedBook = {
  __typename?: 'CombinedBook';
  author_id?: Maybe<Scalars['ID']['output']>;
  cover_image_url?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  file_name: Scalars['String']['output'];
  file_url: Scalars['String']['output'];
  hls_path?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  purchased_at?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type GraphqlUser = {
  __typename?: 'GraphqlUser';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ImageUploadInput = {
  docType: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
};

export type InsertBookResponse = {
  __typename?: 'InsertBookResponse';
  file_url: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  becomeAuthor?: Maybe<Response>;
  createUser?: Maybe<Response>;
  insertBook?: Maybe<AudioFile>;
  insertHlsName?: Maybe<Response>;
  insertPurchaseCodes?: Maybe<Response>;
  login: AuthPayload;
  processAudio?: Maybe<AudioFile>;
  redeemCode?: Maybe<Response>;
  requestAudio?: Maybe<RequestAudioResponse>;
  setCurrentAudioFile?: Maybe<Response>;
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
  cover_image_url?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  file_name: Scalars['String']['input'];
  file_url: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationInsertHlsNameArgs = {
  audio_file_id: Scalars['String']['input'];
  hls_path: Scalars['String']['input'];
};


export type MutationInsertPurchaseCodesArgs = {
  audio_file_id: Scalars['String']['input'];
  author_id: Scalars['String']['input'];
  code: Scalars['String']['input'];
  expires_at: Scalars['String']['input'];
  is_redeemed: Scalars['Boolean']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationProcessAudioArgs = {
  authorId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  docs?: InputMaybe<Array<ImageUploadInput>>;
  fileName: Scalars['String']['input'];
  fileUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationRedeemCodeArgs = {
  code: Scalars['String']['input'];
  firebase_uid: Scalars['String']['input'];
};


export type MutationRequestAudioArgs = {
  audioName: Scalars['String']['input'];
};


export type MutationSetCurrentAudioFileArgs = {
  audio_file_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};

export type ProcessAudioResponse = {
  __typename?: 'ProcessAudioResponse';
  book?: Maybe<InsertBookResponse>;
  hlsUrl?: Maybe<Scalars['String']['output']>;
};

export type PurchaseCodes = {
  __typename?: 'PurchaseCodes';
  audio_file_id: Scalars['String']['output'];
  author_id: Scalars['String']['output'];
  code: Scalars['String']['output'];
  expires_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_redeemed: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAuthorBooks?: Maybe<Array<Maybe<UploadBook>>>;
  getBookByAudioId?: Maybe<CombinedBook>;
  getCurrentAudioFile?: Maybe<AudioFile>;
  getPurchaseCodes?: Maybe<Array<Maybe<PurchaseCodes>>>;
  getRedeemedBooks?: Maybe<Array<Maybe<RedemeedBooks>>>;
  getUserAudioFiles?: Maybe<Array<Maybe<AudioFile>>>;
  isAuthor?: Maybe<User>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetAuthorBooksArgs = {
  firebase_uid: Scalars['ID']['input'];
};


export type QueryGetBookByAudioIdArgs = {
  firebase_uid: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type QueryGetCurrentAudioFileArgs = {
  user_id: Scalars['ID']['input'];
};


export type QueryGetPurchaseCodesArgs = {
  firebase_uid: Scalars['String']['input'];
};


export type QueryGetRedeemedBooksArgs = {
  firebase_uid: Scalars['String']['input'];
};


export type QueryGetUserAudioFilesArgs = {
  firebase_uid: Scalars['String']['input'];
};


export type QueryIsAuthorArgs = {
  firebase_uid: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type RedemeedBooks = {
  __typename?: 'RedemeedBooks';
  cover_image_url?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['String']['output'];
  description: Scalars['String']['output'];
  file_name: Scalars['String']['output'];
  file_url: Scalars['String']['output'];
  hls_path?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  purchased_at: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type RequestAudioResponse = {
  __typename?: 'RequestAudioResponse';
  hlsUrl: Scalars['String']['output'];
};

export type Response = {
  __typename?: 'Response';
  success: Scalars['Boolean']['output'];
};

export type SuccessResult = {
  __typename?: 'SuccessResult';
  message?: Maybe<Scalars['String']['output']>;
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
  current_audio_file?: Maybe<AudioFile>;
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

export type GetAuthorBooksQueryVariables = Exact<{
  firebaseUid: Scalars['ID']['input'];
}>;


export type GetAuthorBooksQuery = { __typename?: 'Query', getAuthorBooks?: Array<{ __typename?: 'UploadBook', id: string, author_id: string, title: string, description?: string, file_url: string, file_name: string, created_at: string }> };

export type GetPurchaseCodesQueryVariables = Exact<{
  firebaseUid: Scalars['String']['input'];
}>;


export type GetPurchaseCodesQuery = { __typename?: 'Query', getPurchaseCodes?: Array<{ __typename?: 'PurchaseCodes', is_redeemed: boolean, code: string, author_id: string, expires_at: string, audio_file_id: string, title: string }> };

export type InsertPurchaseCodesMutationVariables = Exact<{
  authorId: Scalars['String']['input'];
  code: Scalars['String']['input'];
  audioFileId: Scalars['String']['input'];
  expiresAt: Scalars['String']['input'];
  isRedeemed: Scalars['Boolean']['input'];
}>;


export type InsertPurchaseCodesMutation = { __typename?: 'Mutation', insertPurchaseCodes?: { __typename?: 'Response', success: boolean } };

export type IsAuthorQueryVariables = Exact<{
  firebaseUid: Scalars['String']['input'];
}>;


export type IsAuthorQuery = { __typename?: 'Query', isAuthor?: { __typename?: 'User', id: string, firebase_uid: string, username: string, email: string, is_author: boolean, created_at: string } };

export type ProcessAudioMutationVariables = Exact<{
  authorId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  fileUrl: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  docs?: InputMaybe<Array<ImageUploadInput> | ImageUploadInput>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProcessAudioMutation = { __typename?: 'Mutation', processAudio?: { __typename?: 'AudioFile', hlsUrl?: string, book?: { __typename?: 'InsertBookResponse', id: string } } };

export type RequestAudioMutationVariables = Exact<{
  audioName: Scalars['String']['input'];
}>;


export type RequestAudioMutation = { __typename?: 'Mutation', requestAudio?: { __typename?: 'RequestAudioResponse', hlsUrl: string } };

export type CreateUserMutationVariables = Exact<{
  firebaseUid: Scalars['String']['input'];
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  isAuthor: Scalars['Boolean']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'Response', success: boolean } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', firebase_uid: string }> };

export type GetRedeemedBooksQueryVariables = Exact<{
  firebaseUid: Scalars['String']['input'];
}>;


export type GetRedeemedBooksQuery = { __typename?: 'Query', getRedeemedBooks?: Array<{ __typename?: 'RedemeedBooks', id: string, title: string, description: string, file_name: string, file_url: string, hls_path?: string, cover_image_url?: string, created_at: string, purchased_at: string }> };

export type GetUserAudioFilesQueryVariables = Exact<{
  firebaseUid: Scalars['String']['input'];
}>;


export type GetUserAudioFilesQuery = { __typename?: 'Query', getUserAudioFiles?: Array<{ __typename?: 'AudioFile', id: string, user_id: string, purchase_code_id: string, audio_file_id: string, purchased_at: string, audio_title: string, audio_description?: string, audio_file_url: string, audio_hls_path?: string, audio_created_at: string }> };

export type GetUserByIdQueryVariables = Exact<{
  userByIdId: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', userById?: { __typename?: 'User', firebase_uid: string, is_author: boolean, username: string, id: string } };

export type RedeemCodeMutationVariables = Exact<{
  code: Scalars['String']['input'];
  firebaseUid: Scalars['String']['input'];
}>;


export type RedeemCodeMutation = { __typename?: 'Mutation', redeemCode?: { __typename?: 'Response', success: boolean } };

export type InsertHlsNameMutationVariables = Exact<{
  hlsPath: Scalars['String']['input'];
  audioFileId: Scalars['String']['input'];
}>;


export type InsertHlsNameMutation = { __typename?: 'Mutation', insertHlsName?: { __typename?: 'Response', success: boolean } };


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
export const GetAuthorBooksDocument = gql`
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
    `;

/**
 * __useGetAuthorBooksQuery__
 *
 * To run a query within a React component, call `useGetAuthorBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorBooksQuery({
 *   variables: {
 *      firebaseUid: // value for 'firebaseUid'
 *   },
 * });
 */
export function useGetAuthorBooksQuery(baseOptions: Apollo.QueryHookOptions<GetAuthorBooksQuery, GetAuthorBooksQueryVariables> & ({ variables: GetAuthorBooksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthorBooksQuery, GetAuthorBooksQueryVariables>(GetAuthorBooksDocument, options);
      }
export function useGetAuthorBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorBooksQuery, GetAuthorBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthorBooksQuery, GetAuthorBooksQueryVariables>(GetAuthorBooksDocument, options);
        }
export function useGetAuthorBooksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAuthorBooksQuery, GetAuthorBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAuthorBooksQuery, GetAuthorBooksQueryVariables>(GetAuthorBooksDocument, options);
        }
export type GetAuthorBooksQueryHookResult = ReturnType<typeof useGetAuthorBooksQuery>;
export type GetAuthorBooksLazyQueryHookResult = ReturnType<typeof useGetAuthorBooksLazyQuery>;
export type GetAuthorBooksSuspenseQueryHookResult = ReturnType<typeof useGetAuthorBooksSuspenseQuery>;
export type GetAuthorBooksQueryResult = Apollo.QueryResult<GetAuthorBooksQuery, GetAuthorBooksQueryVariables>;
export const GetPurchaseCodesDocument = gql`
    query GetPurchaseCodes($firebaseUid: String!) {
  getPurchaseCodes(firebase_uid: $firebaseUid) {
    is_redeemed
    code
    author_id
    expires_at
    audio_file_id
    title
  }
}
    `;

/**
 * __useGetPurchaseCodesQuery__
 *
 * To run a query within a React component, call `useGetPurchaseCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseCodesQuery({
 *   variables: {
 *      firebaseUid: // value for 'firebaseUid'
 *   },
 * });
 */
export function useGetPurchaseCodesQuery(baseOptions: Apollo.QueryHookOptions<GetPurchaseCodesQuery, GetPurchaseCodesQueryVariables> & ({ variables: GetPurchaseCodesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseCodesQuery, GetPurchaseCodesQueryVariables>(GetPurchaseCodesDocument, options);
      }
export function useGetPurchaseCodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseCodesQuery, GetPurchaseCodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseCodesQuery, GetPurchaseCodesQueryVariables>(GetPurchaseCodesDocument, options);
        }
export function useGetPurchaseCodesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPurchaseCodesQuery, GetPurchaseCodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseCodesQuery, GetPurchaseCodesQueryVariables>(GetPurchaseCodesDocument, options);
        }
export type GetPurchaseCodesQueryHookResult = ReturnType<typeof useGetPurchaseCodesQuery>;
export type GetPurchaseCodesLazyQueryHookResult = ReturnType<typeof useGetPurchaseCodesLazyQuery>;
export type GetPurchaseCodesSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseCodesSuspenseQuery>;
export type GetPurchaseCodesQueryResult = Apollo.QueryResult<GetPurchaseCodesQuery, GetPurchaseCodesQueryVariables>;
export const InsertPurchaseCodesDocument = gql`
    mutation InsertPurchaseCodes($authorId: String!, $code: String!, $audioFileId: String!, $expiresAt: String!, $isRedeemed: Boolean!) {
  insertPurchaseCodes(
    author_id: $authorId
    code: $code
    audio_file_id: $audioFileId
    expires_at: $expiresAt
    is_redeemed: $isRedeemed
  ) {
    success
  }
}
    `;
export type InsertPurchaseCodesMutationFn = Apollo.MutationFunction<InsertPurchaseCodesMutation, InsertPurchaseCodesMutationVariables>;

/**
 * __useInsertPurchaseCodesMutation__
 *
 * To run a mutation, you first call `useInsertPurchaseCodesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertPurchaseCodesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertPurchaseCodesMutation, { data, loading, error }] = useInsertPurchaseCodesMutation({
 *   variables: {
 *      authorId: // value for 'authorId'
 *      code: // value for 'code'
 *      audioFileId: // value for 'audioFileId'
 *      expiresAt: // value for 'expiresAt'
 *      isRedeemed: // value for 'isRedeemed'
 *   },
 * });
 */
export function useInsertPurchaseCodesMutation(baseOptions?: Apollo.MutationHookOptions<InsertPurchaseCodesMutation, InsertPurchaseCodesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertPurchaseCodesMutation, InsertPurchaseCodesMutationVariables>(InsertPurchaseCodesDocument, options);
      }
export type InsertPurchaseCodesMutationHookResult = ReturnType<typeof useInsertPurchaseCodesMutation>;
export type InsertPurchaseCodesMutationResult = Apollo.MutationResult<InsertPurchaseCodesMutation>;
export type InsertPurchaseCodesMutationOptions = Apollo.BaseMutationOptions<InsertPurchaseCodesMutation, InsertPurchaseCodesMutationVariables>;
export const IsAuthorDocument = gql`
    query IsAuthor($firebaseUid: String!) {
  isAuthor(firebase_uid: $firebaseUid) {
    id
    firebase_uid
    username
    email
    is_author
    created_at
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
export const ProcessAudioDocument = gql`
    mutation ProcessAudio($authorId: ID!, $title: String!, $fileUrl: String!, $fileName: String!, $docs: [ImageUploadInput!], $description: String) {
  processAudio(
    authorId: $authorId
    title: $title
    fileUrl: $fileUrl
    fileName: $fileName
    docs: $docs
    description: $description
  ) {
    book {
      id
    }
    hlsUrl
  }
}
    `;
export type ProcessAudioMutationFn = Apollo.MutationFunction<ProcessAudioMutation, ProcessAudioMutationVariables>;

/**
 * __useProcessAudioMutation__
 *
 * To run a mutation, you first call `useProcessAudioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProcessAudioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [processAudioMutation, { data, loading, error }] = useProcessAudioMutation({
 *   variables: {
 *      authorId: // value for 'authorId'
 *      title: // value for 'title'
 *      fileUrl: // value for 'fileUrl'
 *      fileName: // value for 'fileName'
 *      docs: // value for 'docs'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useProcessAudioMutation(baseOptions?: Apollo.MutationHookOptions<ProcessAudioMutation, ProcessAudioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProcessAudioMutation, ProcessAudioMutationVariables>(ProcessAudioDocument, options);
      }
export type ProcessAudioMutationHookResult = ReturnType<typeof useProcessAudioMutation>;
export type ProcessAudioMutationResult = Apollo.MutationResult<ProcessAudioMutation>;
export type ProcessAudioMutationOptions = Apollo.BaseMutationOptions<ProcessAudioMutation, ProcessAudioMutationVariables>;
export const RequestAudioDocument = gql`
    mutation RequestAudio($audioName: String!) {
  requestAudio(audioName: $audioName) {
    hlsUrl
  }
}
    `;
export type RequestAudioMutationFn = Apollo.MutationFunction<RequestAudioMutation, RequestAudioMutationVariables>;

/**
 * __useRequestAudioMutation__
 *
 * To run a mutation, you first call `useRequestAudioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestAudioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestAudioMutation, { data, loading, error }] = useRequestAudioMutation({
 *   variables: {
 *      audioName: // value for 'audioName'
 *   },
 * });
 */
export function useRequestAudioMutation(baseOptions?: Apollo.MutationHookOptions<RequestAudioMutation, RequestAudioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestAudioMutation, RequestAudioMutationVariables>(RequestAudioDocument, options);
      }
export type RequestAudioMutationHookResult = ReturnType<typeof useRequestAudioMutation>;
export type RequestAudioMutationResult = Apollo.MutationResult<RequestAudioMutation>;
export type RequestAudioMutationOptions = Apollo.BaseMutationOptions<RequestAudioMutation, RequestAudioMutationVariables>;
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
export const GetRedeemedBooksDocument = gql`
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

/**
 * __useGetRedeemedBooksQuery__
 *
 * To run a query within a React component, call `useGetRedeemedBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRedeemedBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRedeemedBooksQuery({
 *   variables: {
 *      firebaseUid: // value for 'firebaseUid'
 *   },
 * });
 */
export function useGetRedeemedBooksQuery(baseOptions: Apollo.QueryHookOptions<GetRedeemedBooksQuery, GetRedeemedBooksQueryVariables> & ({ variables: GetRedeemedBooksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRedeemedBooksQuery, GetRedeemedBooksQueryVariables>(GetRedeemedBooksDocument, options);
      }
export function useGetRedeemedBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRedeemedBooksQuery, GetRedeemedBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRedeemedBooksQuery, GetRedeemedBooksQueryVariables>(GetRedeemedBooksDocument, options);
        }
export function useGetRedeemedBooksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRedeemedBooksQuery, GetRedeemedBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRedeemedBooksQuery, GetRedeemedBooksQueryVariables>(GetRedeemedBooksDocument, options);
        }
export type GetRedeemedBooksQueryHookResult = ReturnType<typeof useGetRedeemedBooksQuery>;
export type GetRedeemedBooksLazyQueryHookResult = ReturnType<typeof useGetRedeemedBooksLazyQuery>;
export type GetRedeemedBooksSuspenseQueryHookResult = ReturnType<typeof useGetRedeemedBooksSuspenseQuery>;
export type GetRedeemedBooksQueryResult = Apollo.QueryResult<GetRedeemedBooksQuery, GetRedeemedBooksQueryVariables>;
export const GetUserAudioFilesDocument = gql`
    query GetUserAudioFiles($firebaseUid: String!) {
  getUserAudioFiles(firebase_uid: $firebaseUid) {
    id
    user_id
    purchase_code_id
    audio_file_id
    purchased_at
    audio_title
    audio_description
    audio_file_url
    audio_hls_path
    audio_created_at
  }
}
    `;

/**
 * __useGetUserAudioFilesQuery__
 *
 * To run a query within a React component, call `useGetUserAudioFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAudioFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAudioFilesQuery({
 *   variables: {
 *      firebaseUid: // value for 'firebaseUid'
 *   },
 * });
 */
export function useGetUserAudioFilesQuery(baseOptions: Apollo.QueryHookOptions<GetUserAudioFilesQuery, GetUserAudioFilesQueryVariables> & ({ variables: GetUserAudioFilesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAudioFilesQuery, GetUserAudioFilesQueryVariables>(GetUserAudioFilesDocument, options);
      }
export function useGetUserAudioFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAudioFilesQuery, GetUserAudioFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAudioFilesQuery, GetUserAudioFilesQueryVariables>(GetUserAudioFilesDocument, options);
        }
export function useGetUserAudioFilesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserAudioFilesQuery, GetUserAudioFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserAudioFilesQuery, GetUserAudioFilesQueryVariables>(GetUserAudioFilesDocument, options);
        }
export type GetUserAudioFilesQueryHookResult = ReturnType<typeof useGetUserAudioFilesQuery>;
export type GetUserAudioFilesLazyQueryHookResult = ReturnType<typeof useGetUserAudioFilesLazyQuery>;
export type GetUserAudioFilesSuspenseQueryHookResult = ReturnType<typeof useGetUserAudioFilesSuspenseQuery>;
export type GetUserAudioFilesQueryResult = Apollo.QueryResult<GetUserAudioFilesQuery, GetUserAudioFilesQueryVariables>;
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
export const RedeemCodeDocument = gql`
    mutation RedeemCode($code: String!, $firebaseUid: String!) {
  redeemCode(code: $code, firebase_uid: $firebaseUid) {
    success
  }
}
    `;
export type RedeemCodeMutationFn = Apollo.MutationFunction<RedeemCodeMutation, RedeemCodeMutationVariables>;

/**
 * __useRedeemCodeMutation__
 *
 * To run a mutation, you first call `useRedeemCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRedeemCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [redeemCodeMutation, { data, loading, error }] = useRedeemCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *      firebaseUid: // value for 'firebaseUid'
 *   },
 * });
 */
export function useRedeemCodeMutation(baseOptions?: Apollo.MutationHookOptions<RedeemCodeMutation, RedeemCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RedeemCodeMutation, RedeemCodeMutationVariables>(RedeemCodeDocument, options);
      }
export type RedeemCodeMutationHookResult = ReturnType<typeof useRedeemCodeMutation>;
export type RedeemCodeMutationResult = Apollo.MutationResult<RedeemCodeMutation>;
export type RedeemCodeMutationOptions = Apollo.BaseMutationOptions<RedeemCodeMutation, RedeemCodeMutationVariables>;
export const InsertHlsNameDocument = gql`
    mutation InsertHlsName($hlsPath: String!, $audioFileId: String!) {
  insertHlsName(hls_path: $hlsPath, audio_file_id: $audioFileId) {
    success
  }
}
    `;
export type InsertHlsNameMutationFn = Apollo.MutationFunction<InsertHlsNameMutation, InsertHlsNameMutationVariables>;

/**
 * __useInsertHlsNameMutation__
 *
 * To run a mutation, you first call `useInsertHlsNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertHlsNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertHlsNameMutation, { data, loading, error }] = useInsertHlsNameMutation({
 *   variables: {
 *      hlsPath: // value for 'hlsPath'
 *      audioFileId: // value for 'audioFileId'
 *   },
 * });
 */
export function useInsertHlsNameMutation(baseOptions?: Apollo.MutationHookOptions<InsertHlsNameMutation, InsertHlsNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertHlsNameMutation, InsertHlsNameMutationVariables>(InsertHlsNameDocument, options);
      }
export type InsertHlsNameMutationHookResult = ReturnType<typeof useInsertHlsNameMutation>;
export type InsertHlsNameMutationResult = Apollo.MutationResult<InsertHlsNameMutation>;
export type InsertHlsNameMutationOptions = Apollo.BaseMutationOptions<InsertHlsNameMutation, InsertHlsNameMutationVariables>;