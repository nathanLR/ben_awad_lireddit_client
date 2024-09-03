import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppWrapper } from "../components/AppWrapper";
import {Post} from "../generated/graphql";

const client = new ApolloClient({
  name: "lireddit_client",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            keyArgs: false,
            merge(existing: Post[], incoming: Post[]){
              console.log("MERGING", existing, incoming)
              const merge = existing ? existing.slice(0) : [];
              return [...merge, ...incoming];
            }

          }
        }
      }
    }
  }),
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  devtools: {
    enabled: true
  },
  ssrMode: true
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
