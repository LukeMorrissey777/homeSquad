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

export type Home = {
  __typename?: 'Home';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  owner?: Maybe<User>;
  users?: Maybe<Array<User>>;
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