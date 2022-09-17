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

export const SEARCH_POKEMONS = gql`
  query pokemon($name: String) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`
