import { ChakraProvider } from "@chakra-ui/react";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import React from "react";
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import {
  CreateHomeMutation,
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
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
  url: "http://localhost:4000/graphql",
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
          // createHome: (result, args, cache, info) => {
          //   betterUpdateQuery<CreateHomeMutation, MeQuery>(
          //     cache,
          //     { query: MeDocument },
          //     result,
          //     (result, query) => {
          //       if (result.createHome.errors) {
          //         return query;
          //       } else {
          //         return { me: result.createHome. };
          //       }
          //     }
          //   );
          // },
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
