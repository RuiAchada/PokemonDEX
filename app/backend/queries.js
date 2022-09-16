import { useQuery, gql } from "@apollo/client"

export const GET_POKEMONS = gql`
  query ($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      image
      types
    }
  }
`
