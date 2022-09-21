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
import { colorTypes } from "../components/Pokemon"

// query
import { useQuery, useLazyQuery, gql } from "@apollo/client"
import { GET_POKEMON_DETAILS } from "../backend/queries"
import Pokemon from "../components/Pokemon"

function BattleHome(props) {
  const appState = useContext(StateContext)
  const numberOfPoke = 4
  const first = 151
  const multiplier = 15

  const [state, setState] = useImmer({
    selectedRivalPokemon: { id: 1, image: "../res/loadingPokemon.png" },
    rivalHP: 0,
    rivalHpPercent: "100%",
    myHP: 0,
    myHpPercent: "100%",
    rivalPokemon: [],
    selectedMyPokemon: { id: 1, image: "../res/loadingPokemon.png" },
    myPokemon: [],
    isLoading: true
  })

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
      const myPokemon = draft.myPokemon[0]
      const rivalPokemon = draft.rivalPokemon[0]
      draft.selectedMyPokemon = myPokemon
      draft.selectedRivalPokemon = rivalPokemon
      draft.isLoading = false
      draft.myHP = myPokemon.maxHP
      draft.rivalHP = rivalPokemon.maxHP
    })
  }, [])

  function deductDamage() {}

  function attacked({ name, type, damage }, e) {
    e.preventDefault()
    console.log(name, type, damage)
    const finalDamage = damage * multiplier
    let hpLeft = state.rivalHP - finalDamage
    let finalPercentage
    if (hpLeft < 0) {
      hpLeft = 0
      finalPercentage = "0%"
    } else finalPercentage = parseInt((parseInt(hpLeft) / parseInt(state.selectedRivalPokemon.maxHP)) * 100) + "%"

    setState(draft => {
      draft.rivalHP = hpLeft
      draft.rivalHpPercent = finalPercentage
    })
  }

  function getAttackColor(attack) {
    return attack?.type ? colorTypes[`${attack.type.toLowerCase()}`] + "cc" : "#eee" // 95 opacity
  }

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
                  <HealthBar hpPercentage={state.rivalHpPercent} hp={state.rivalHP} maxHP={state.selectedRivalPokemon.maxHP} />
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
                  <HealthBar hpPercentage={state.myHpPercent} hp={state.myHP} maxHP={state.selectedMyPokemon.maxHP} />
                </div>
              </div>
            )}
          </div>

          <div className="container">
            <div className="row">
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.fast[0]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.fast[0], e)} className="col border font-weight-bold p-2">
                {state.isLoading || !state.selectedMyPokemon || !state.selectedMyPokemon.attacks.fast[0] ? " " : state.selectedMyPokemon.attacks.fast[0].name}
              </div>
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.fast[1]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.fast[1], e)} className="col border font-weight-bold p-2">
                {state.isLoading || !state.selectedMyPokemon || !state.selectedMyPokemon.attacks.fast[1] ? " " : state.selectedMyPokemon.attacks.fast[1].name}
              </div>{" "}
              <div className="w-100"></div>
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.special[0]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.special[0], e)} className="col border font-weight-bold p-2">
                {state.isLoading || !state.selectedMyPokemon || !state.selectedMyPokemon.attacks.special[0] ? " " : state.selectedMyPokemon.attacks.special[0].name}
              </div>
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.special[1]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.special[1], e)} className="col border font-weight-bold p-2">
                {state.isLoading || !state.selectedMyPokemon || !state.selectedMyPokemon.attacks.special[1] ? " " : state.selectedMyPokemon.attacks.special[1].name}
              </div>{" "}
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </Page>
  )
}

export default BattleHome
