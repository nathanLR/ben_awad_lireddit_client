import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Wrapper from "../components/Wrapper";

const client = new ApolloClient({
  name: "lireddit_client",
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: ["id", "username"]
      }
    }
  }),
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  devtools: {
    enabled: true
  }
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
