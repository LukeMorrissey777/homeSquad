import { ChakraProvider } from "@chakra-ui/react";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import React from "react";
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import {
  CreateHomeMutation,
  CreatePostMutation,
  HomeQuery,
  JoinHomeMutation,
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  HomeDocument,
  CreateGroceryItemMutation,
  DeleteGroceryItemMutation,
  DeletePostMutation,
  UpdateGroceryItemMutation,
} from "../generated/graphql";

import theme from "../theme";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: "http://home-squad-backend-service:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return { me: result.login.user };
                }
              }
            );
          },
          register: (result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return { me: result.register.user };
                }
              }
            );
          },
          createHome: (result, args, cache, info) => {
            betterUpdateQuery<CreateHomeMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (result, query) => {
                if (
                  result.createHome.errors ||
                  !query.me ||
                  !result.createHome.home
                ) {
                  return query;
                } else if (!query.me.homes) {
                  query.me.homes = [
                    {
                      id: result.createHome.home.id,
                      name: result.createHome.home.name,
                    },
                  ];
                  return query;
                } else {
                  query.me.homes.push({
                    id: result.createHome.home.id,
                    name: result.createHome.home.name,
                  });
                  return query;
                }
              }
            );
          },
          joinHome: (result, args, cache, info) => {
            betterUpdateQuery<JoinHomeMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (result, query) => {
                if (
                  result.joinHome.errors ||
                  !query.me?.homes ||
                  !result.joinHome.home?.id
                ) {
                  return query;
                } else {
                  query.me.homes.push({
                    id: result.joinHome.home.id,
                    name: result.joinHome.home.name,
                  });
                  return query;
                }
              }
            );
          },
          createPost: (result, args, cache, info) => {
            betterUpdateQuery<CreatePostMutation, HomeQuery>(
              cache,
              { query: HomeDocument, variables: { id: args.homeId } },
              result,
              (result, query) => {
                if (
                  result.createPost.errors ||
                  !query.home?.posts ||
                  !result.createPost.post?.author?.id
                ) {
                  return query;
                } else {
                  const post = result.createPost.post;
                  if (post.author) {
                    console.log("Added post");
                    query.home.posts.push({
                      id: post.id,
                      text: post.text,
                      author: {
                        id: post.author.id,
                        username: post.author.username,
                      },
                    });
                  }

                  return query;
                }
              }
            );
          },
          createGroceryItem: (result, args, cache, info) => {
            betterUpdateQuery<CreateGroceryItemMutation, HomeQuery>(
              cache,
              { query: HomeDocument, variables: { id: args.homeId } },
              result,
              (result, query) => {
                if (
                  result.createGroceryItem.errors ||
                  !query.home?.groceryItems ||
                  !result.createGroceryItem.groceryItem?.author?.id
                ) {
                  return query;
                }
                query.home?.groceryItems.push({
                  id: result.createGroceryItem.groceryItem?.id,
                  completed: result.createGroceryItem.groceryItem?.completed,
                  item: result.createGroceryItem.groceryItem?.item,
                  author: {
                    id: result.createGroceryItem.groceryItem?.author?.id,
                    username:
                      result.createGroceryItem.groceryItem?.author?.username,
                  },
                });
                return query;
              }
            );
          },
          deleteGroceryItem: (result, args, cache, info) => {
            betterUpdateQuery<DeleteGroceryItemMutation, HomeQuery>(
              cache,
              { query: HomeDocument, variables: { id: args.homeId } },
              result,
              (result, query) => {
                if (
                  result.deleteGroceryItem.errors ||
                  !query.home?.groceryItems
                ) {
                  return query;
                }
                const groceryIndex = query.home?.groceryItems?.findIndex(
                  (element) => {
                    return element.id == args.id;
                  }
                );
                query.home.groceryItems = query.home.groceryItems.splice(
                  groceryIndex,
                  groceryIndex
                );
                return query;
              }
            );
          },
          deletePost: (result, args, cache, info) => {
            betterUpdateQuery<DeletePostMutation, HomeQuery>(
              cache,
              { query: HomeDocument, variables: { id: args.homeId } },
              result,
              (result, query) => {
                if (result.deletePost.errors || !query.home?.posts) {
                  return query;
                }
                const postIndex = query.home?.posts?.findIndex((element) => {
                  return element.id == args.id;
                });
                query.home.posts = query.home.posts.splice(
                  postIndex,
                  postIndex
                );
                return query;
              }
            );
          },
          updateGroceryItem: (result, args, cache, info) => {
            betterUpdateQuery<UpdateGroceryItemMutation, HomeQuery>(
              cache,
              { query: HomeDocument, variables: { id: args.homeId } },
              result,
              (result, query) => {
                const groceryIndex = query.home?.groceryItems?.findIndex(
                  (element) => {
                    return element.id == args.id;
                  }
                );

                if (
                  !result.updateGroceryItem ||
                  typeof groceryIndex === "undefined" ||
                  !query.home?.groceryItems
                ) {
                  return query;
                }

                query.home.groceryItems[groceryIndex].completed =
                  result.updateGroceryItem?.completed;

                console.log(query);

                return query;
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
