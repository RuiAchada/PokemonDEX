import React, { useContext, useEffect } from "react"
import StateContext from "../StateContext"
import { useQuery, gql } from "@apollo/client"
import Pokemon from "./Pokemon"
import { GET_POKEMONS } from "../backend/queries"

const first = 20

function PokemonGrid() {
  const appState = useContext(StateContext)
  console.log(appState)

  if (appState.searchedPokemon) {
    return <Pokemon key={appState.searchedPokemon.id} name={appState.searchedPokemon.name} image={appState.searchedPokemon.image} types={appState.searchedPokemon.types} />
  } else {
    console.log(false)
    const { loading, error, data } = useQuery(GET_POKEMONS, {
      variables: { first: first || first !== null }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    console.log(data)
    return data.pokemons.map(({ id, name, image, types }) => <Pokemon key={id} name={name} image={image} types={types} />)
  }
}

export default PokemonGrid
