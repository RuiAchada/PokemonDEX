import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client"

export const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app", // specifies the URL of our GraphQL server. //https://graphqlpokemon.favware.tech/
  cache: new InMemoryCache() // an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
})
