import React, { useContext, useEffect, useState } from "react"
import Page from "../components/Page"
import StateContext from "../Home/StateContext"
import { CSSTransition } from "react-transition-group"
import { useImmer } from "use-immer"
import BattlePokeballs from "../components/BattlePokeballs"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import PokemonImg from "../components/PokemonImg"
import HealthBar from "../components/HealthBar"

// query
import { useQuery, useLazyQuery, gql } from "@apollo/client"
import { GET_POKEMON_DETAILS } from "../backend/queries"
import Pokemon from "../components/Pokemon"

function BattleHome(props) {
  const appState = useContext(StateContext)
  const numberOfPoke = 4
  const first = 151

  const [state, setState] = useImmer({
    selectedRivalPokemon: { id: 1, image: "../res/loadingPokemon.png" },
    rivalPokemon: [],
    selectedMyPokemon: [],
    myPokemon: [],
    isLoading: true
  })

  function getRandomPokemon() {
    if (appState.pokemonList) {
      const randomN = Math.floor(Math.random() * appState.pokemonList.length)
      const randomPokemon = appState.pokemonList[randomN]
      return randomPokemon
    }
  }

  console.log(state)

  /*  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first: first || first !== null }
  })*/

  /* const [loadPokemon, { loading, error, data }] = useLazyQuery(GET_POKEMON_DETAILS, {
    notifyOnNetworkStatusChange: true,
    variables: { id },
    onCompleted: data => {
      console.log(data)
      if (data.pokemon) selectedMyPokemon.push(data.pokemon)
    }
  })*/

  useEffect(() => {
    const half = Math.ceil(appState.chosenPokemon.length / 2)
    setState(draft => {
      if (!state.myPokemon.length) {
        draft.myPokemon = appState.chosenPokemon.slice(0, half)
      }
      if (!state.rivalPokemon.length) {
        draft.rivalPokemon = appState.chosenPokemon.slice(half)
      }
      draft.selectedMyPokemon = draft.myPokemon[0]
      draft.selectedRivalPokemon = draft.rivalPokemon[0]
      draft.isLoading = false
    })
  }, [])

  return (
    <Page title="Battle">
      <SkeletonTheme baseColor="#dddddd" highlightColor="#e7e7e7">
        <div className="pb-4">
          <div className="d-flex flex-column">
            {Boolean(!state.selectedRivalPokemon) && <h2>No pokemon selected</h2>}
            {Boolean(state.selectedRivalPokemon) && (
              <div>
                <div className="d-flex flex-row">
                  <Pokemon key={state.selectedRivalPokemon.id} id={state.selectedRivalPokemon.id} isLoading={state.isLoading} number={""} name={state.selectedRivalPokemon.name} image={state.selectedRivalPokemon.image} types={state.selectedRivalPokemon.types} />
                  <HealthBar hp={state.selectedRivalPokemon.maxHP} maxHP={state.selectedRivalPokemon.maxHP} />
                </div>
              </div>
            )}
          </div>

          <div className="d-flex flex-column">
            {Boolean(!state.selectedMyPokemon) && (
              <div className="d-flex flex-row-reverse">
                <h2>No pokemon selected</h2>
              </div>
            )}
            {Boolean(state.selectedMyPokemon) && (
              <div>
                <div className="d-flex flex-row-reverse">
                  <Pokemon key={state.selectedMyPokemon.id} id={state.selectedMyPokemon.id} isLoading={state.isLoading} number={""} name={state.selectedMyPokemon.name} image={state.selectedMyPokemon.image} types={state.selectedMyPokemon.types} />
                  <HealthBar hp={state.selectedMyPokemon.maxHP} maxHP={state.selectedMyPokemon.maxHP} />
                </div>
              </div>
            )}
          </div>

          <div className="container">
            <div className="row">
              <div className="col border">{state.isLoading || !state.selectedMyPokemon ? "Attack A" : state.selectedMyPokemon.attacks.fast[0].name}</div>
              <div className="col border">{state.isLoading || !state.selectedMyPokemon ? "Attack B" : state.selectedMyPokemon.attacks.fast[1].name}</div>
              <div className="w-100"></div>
              <div className="col border">{state.isLoading || !state.selectedMyPokemon ? "Attack C" : state.selectedMyPokemon.attacks.special[0].name}</div>
              <div className="col border">{state.isLoading || !state.selectedMyPokemon ? "Attack D" : state.selectedMyPokemon.attacks.special[1].name}</div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </Page>
  )
}

export default BattleHome
