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

export const GET_POKEMONS_WITH_DETAILS = gql`
  query ($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      evolutions {
        id
        number
        name
        image
      }
      classification
      types
      resistant
      weaknesses
      maxHP
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
    }
  }
`

export const SEARCH_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      evolutions {
        id
        number
        name
        image
      }
      classification
      types
      resistant
      weaknesses
      image
    }
  }
`

// we don't need all these fields but I will keep them for further development.
export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      evolutions {
        id
        number
        name
        image
      }
      classification
      types
      resistant
      weaknesses
      maxHP
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
    }
  }
`
