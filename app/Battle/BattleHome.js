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
import { GET_POKEMONS } from "../backend/queries"
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

  // remove this and change to caching
  const [loadPokemon, { loading, error, data }] = useLazyQuery(GET_POKEMONS, {
    variables: { first: first || first !== null }
  })

  useEffect(() => {
    loadPokemon()
    setState(draft => {
      for (let i = 0; i < numberOfPoke; i++) {
        const randomMyPoke = getRandomPokemon()
        draft.myPokemon.push(randomMyPoke)
        const randomRivalPoke = getRandomPokemon()
        draft.rivalPokemon.push(randomRivalPoke)
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
            <div className="d-flex flex-row">
              <Pokemon key={state.selectedMyPokemon.id} id={state.selectedMyPokemon.id} isLoading={state.isLoading} number={""} name={state.selectedMyPokemon.name} image={state.selectedMyPokemon.image} types={state.selectedMyPokemon.types} />
              <HealthBar />
            </div>
            <div className="d-flex flex-row">
              <BattlePokeballs />
            </div>
          </div>

          <div className="d-flex flex-column">
            <div className="d-flex flex-row-reverse">
              <BattlePokeballs />
              <h4>Name</h4>
            </div>
            <div className="d-flex flex-row-reverse">
              <Pokemon key={state.selectedRivalPokemon.id} id={state.selectedRivalPokemon.id} isLoading={state.isLoading} number={""} name={state.selectedRivalPokemon.name} image={state.selectedRivalPokemon.image} types={state.selectedRivalPokemon.types} />
              <HealthBar />
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col border">{state.isLoading || !state.selectedRivalPokemon ? "-" : ""}</div>
              <div className="col border">Column</div>
              <div className="w-100"></div>
              <div className="col border">Column</div>
              <div className="col border">Column</div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </Page>
  )
}

export default BattleHome
