import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client"
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist"

const cache = new InMemoryCache()

export const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app", // specifies the URL of our GraphQL server. //https://graphqlpokemon.favware.tech/
  cache: cache // an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
})

// tentative of persistant cache
/*
export const client = () => {
  const cache = new InMemoryCache()

  persistCache({
    cache,
    storage: window.localStorage
  })

  return new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app",
    cache
  })
}*/
