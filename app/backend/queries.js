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
// we don't need all these fields but I will keep them for further development.
export const SEARCH_POKEMON = gql`
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
      evolutions {
        id
        number
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        image
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
