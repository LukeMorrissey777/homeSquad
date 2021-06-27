import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GroceryItem = {
  __typename?: 'GroceryItem';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  author?: Maybe<User>;
  home?: Maybe<Home>;
  item: Scalars['String'];
  completed: Scalars['Boolean'];
};

export type GroceryItemResponse = {
  __typename?: 'GroceryItemResponse';
  errors?: Maybe<Array<FieldError>>;
  groceryItem?: Maybe<GroceryItem>;
};

export type Home = {
  __typename?: 'Home';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  owner?: Maybe<User>;
  users?: Maybe<Array<User>>;
  posts?: Maybe<Array<Post>>;
  groceryItems?: Maybe<Array<GroceryItem>>;
  name: Scalars['String'];
};

export type HomeResponse = {
  __typename?: 'HomeResponse';
  errors?: Maybe<Array<FieldError>>;
  home?: Maybe<Home>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  createHome: HomeResponse;
  joinHome: HomeResponse;
  leaveHome: SuccessResponse;
  updateHome?: Maybe<Home>;
  deleteHome: SuccessResponse;
  createPost: PostResponse;
  deletePost: SuccessResponse;
  createGroceryItem: GroceryItemResponse;
  deleteGroceryItem: SuccessResponse;
  updateGroceryItem?: Maybe<GroceryItem>;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationCreateHomeArgs = {
  name: Scalars['String'];
};


export type MutationJoinHomeArgs = {
  name: Scalars['String'];
};


export type MutationLeaveHomeArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateHomeArgs = {
  name?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeleteHomeArgs = {
  id: Scalars['Float'];
};


export type MutationCreatePostArgs = {
  homeId: Scalars['Float'];
  text: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationCreateGroceryItemArgs = {
  homeId: Scalars['Float'];
  item: Scalars['String'];
};


export type MutationDeleteGroceryItemArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateGroceryItemArgs = {
  completed?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  author?: Maybe<User>;
  home?: Maybe<Home>;
  text: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  myhomes?: Maybe<Array<Home>>;
  homes: Array<Home>;
  home?: Maybe<Home>;
};


export type QueryHomeArgs = {
  id: Scalars['Float'];
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  homes?: Maybe<Array<Home>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type CreateGroceryItemMutationVariables = Exact<{
  homeId: Scalars['Float'];
  item: Scalars['String'];
}>;


export type CreateGroceryItemMutation = (
  { __typename?: 'Mutation' }
  & { createGroceryItem: (
    { __typename?: 'GroceryItemResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>>, groceryItem?: Maybe<(
      { __typename?: 'GroceryItem' }
      & Pick<GroceryItem, 'id' | 'item' | 'completed'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      )> }
    )> }
  ) }
);

export type CreateHomeMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateHomeMutation = (
  { __typename?: 'Mutation' }
  & { createHome: (
    { __typename?: 'HomeResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, home?: Maybe<(
      { __typename?: 'Home' }
      & Pick<Home, 'id' | 'name'>
    )> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  homeId: Scalars['Float'];
  text: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'PostResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'text'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      )> }
    )> }
  ) }
);

export type DeleteGroceryItemMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteGroceryItemMutation = (
  { __typename?: 'Mutation' }
  & { deleteGroceryItem: (
    { __typename?: 'SuccessResponse' }
    & Pick<SuccessResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>> }
  ) }
);

export type DeleteHomeMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteHomeMutation = (
  { __typename?: 'Mutation' }
  & { deleteHome: (
    { __typename?: 'SuccessResponse' }
    & Pick<SuccessResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: (
    { __typename?: 'SuccessResponse' }
    & Pick<SuccessResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type JoinHomeMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type JoinHomeMutation = (
  { __typename?: 'Mutation' }
  & { joinHome: (
    { __typename?: 'HomeResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, home?: Maybe<(
      { __typename?: 'Home' }
      & Pick<Home, 'id' | 'name'>
    )> }
  ) }
);

export type LeaveHomeMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type LeaveHomeMutation = (
  { __typename?: 'Mutation' }
  & { leaveHome: (
    { __typename?: 'SuccessResponse' }
    & Pick<SuccessResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type UpdateGroceryItemMutationVariables = Exact<{
  id: Scalars['Float'];
  completed: Scalars['Boolean'];
}>;


export type UpdateGroceryItemMutation = (
  { __typename?: 'Mutation' }
  & { updateGroceryItem?: Maybe<(
    { __typename?: 'GroceryItem' }
    & Pick<GroceryItem, 'id' | 'item' | 'completed'>
  )> }
);

export type HomeQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type HomeQuery = (
  { __typename?: 'Query' }
  & { home?: Maybe<(
    { __typename?: 'Home' }
    & Pick<Home, 'id' | 'name'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & { homes?: Maybe<Array<(
      { __typename?: 'Home' }
      & Pick<Home, 'id' | 'name'>
    )>> }
  )> }
);


export const CreateGroceryItemDocument = gql`
    mutation CreateGroceryItem($homeId: Float!, $item: String!) {
  createGroceryItem(homeId: $homeId, item: $item) {
    errors {
      message
      field
    }
    groceryItem {
      id
      item
      completed
      author {
        id
        username
      }
    }
  }
}
    `;

export function useCreateGroceryItemMutation() {
  return Urql.useMutation<CreateGroceryItemMutation, CreateGroceryItemMutationVariables>(CreateGroceryItemDocument);
};
export const CreateHomeDocument = gql`
    mutation CreateHome($name: String!) {
  createHome(name: $name) {
    errors {
      field
      message
    }
    home {
      id
      name
    }
  }
}
    `;

export function useCreateHomeMutation() {
  return Urql.useMutation<CreateHomeMutation, CreateHomeMutationVariables>(CreateHomeDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($homeId: Float!, $text: String!) {
  createPost(homeId: $homeId, text: $text) {
    errors {
      field
      message
    }
    post {
      id
      text
      author {
        id
        username
      }
    }
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeleteGroceryItemDocument = gql`
    mutation DeleteGroceryItem($id: Float!) {
  deleteGroceryItem(id: $id) {
    success
    errors {
      message
      field
    }
  }
}
    `;

export function useDeleteGroceryItemMutation() {
  return Urql.useMutation<DeleteGroceryItemMutation, DeleteGroceryItemMutationVariables>(DeleteGroceryItemDocument);
};
export const DeleteHomeDocument = gql`
    mutation DeleteHome($id: Float!) {
  deleteHome(id: $id) {
    success
    errors {
      field
      message
    }
  }
}
    `;

export function useDeleteHomeMutation() {
  return Urql.useMutation<DeleteHomeMutation, DeleteHomeMutationVariables>(DeleteHomeDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: Float!) {
  deletePost(id: $id) {
    errors {
      field
      message
    }
    success
  }
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const JoinHomeDocument = gql`
    mutation JoinHome($name: String!) {
  joinHome(name: $name) {
    errors {
      field
      message
    }
    home {
      id
      name
    }
  }
}
    `;

export function useJoinHomeMutation() {
  return Urql.useMutation<JoinHomeMutation, JoinHomeMutationVariables>(JoinHomeDocument);
};
export const LeaveHomeDocument = gql`
    mutation LeaveHome($id: Float!) {
  leaveHome(id: $id) {
    success
    errors {
      field
      message
    }
  }
}
    `;

export function useLeaveHomeMutation() {
  return Urql.useMutation<LeaveHomeMutation, LeaveHomeMutationVariables>(LeaveHomeDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateGroceryItemDocument = gql`
    mutation UpdateGroceryItem($id: Float!, $completed: Boolean!) {
  updateGroceryItem(id: $id, completed: $completed) {
    id
    item
    completed
  }
}
    `;

export function useUpdateGroceryItemMutation() {
  return Urql.useMutation<UpdateGroceryItemMutation, UpdateGroceryItemMutationVariables>(UpdateGroceryItemDocument);
};
export const HomeDocument = gql`
    query Home($id: Float!) {
  home(id: $id) {
    id
    name
    owner {
      id
      username
    }
    users {
      id
      username
    }
  }
}
    `;

export function useHomeQuery(options: Omit<Urql.UseQueryArgs<HomeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HomeQuery>({ query: HomeDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    homes {
      id
      name
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};