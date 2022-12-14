import React, { useContext, useEffect } from "react"
import StateContext from "../Home/StateContext"
import DispatchContext from "../Home/DispatchContext"
import { useQuery, useLazyQuery, gql } from "@apollo/client"
import { useImmer } from "use-immer"
import Pokemon from "./Pokemon"
import { GET_POKEMONS_WITH_DETAILS } from "../backend/queries"

const first = 151

function PokemonGrid() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [state, setState] = useImmer({
    isLoading: true,
    isError: false
  })

  /*const { loading, error, data } = useQuery(GET_POKEMONS_WITH_DETAILS, {
    variables: { first: first || first !== null }
  })*/
  const [loadPokemon, { loading, error, data }] = useLazyQuery(GET_POKEMONS_WITH_DETAILS, {
    variables: { first: first || first !== null }
  })

  useEffect(() => {
    loadPokemon()
  }, [])

  useEffect(() => {
    if (data && loading) {
      // loading
    }
    if (data && error) {
      // error
      setState(draft => {
        draft.isError = true
      })
    }

    if (data && !loading) {
      console.log(data.pokemons)
      appDispatch({ type: "pokemonList", value: data.pokemons })
      setState(draft => {
        draft.isLoading = false
      })
    }
  }, [data])

  if (state.isError) return <p>Error...</p>
  if (state.isLoading || !appState.pokemonList) {
    return [...Array(12)].map((x, i) => <Pokemon key={i} isLoading={state.isLoading} types={[]} />)
    //return <p>Loading...</p>
  }
  return appState.pokemonFiltered.map(({ id, number, name, image, types }) => <Pokemon key={id} id={id} isLoading={state.isLoading} number={number} name={name} image={image} types={types} />)
}

export default PokemonGrid
