import React, { useContext, useEffect, useState } from "react"
import Page from "../components/Page"
import StateContext from "../Home/StateContext"
import DispatchContext from "../Home/DispatchContext"
import { CSSTransition } from "react-transition-group"
import { useImmer } from "use-immer"
import BattlePokeballs from "../components/BattlePokeballs"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import PokemonImg from "../components/PokemonImg"
import HealthBar from "../components/HealthBar"
import { colorTypes } from "../components/Pokemon"
import Attack from "../components/Attack"
import GameOver from "../components/GameOver"

// query
import { useQuery, useLazyQuery, gql } from "@apollo/client"
import { GET_POKEMON_DETAILS } from "../backend/queries"
import Pokemon from "../components/Pokemon"

function BattleHome(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const numberOfPoke = 4
  const first = 151
  const multiplier = 15

  const [state, setState] = useImmer({
    selectedRivalPokemon: { image: "../res/loadingPokemon.png" },
    rivalHP: 0,
    rivalHpPercent: "100%",
    myHP: 0,
    myHpPercent: "100%",
    rivalPokemon: [{}],
    rivalPokemonIdx: 0,
    selectedMyPokemon: { image: "../res/loadingPokemon.png" },
    myPokemon: [{}],
    myPokemonIdx: 0,
    isLoading: true,
    gameOver: false,
    topMessage: "",
    bottomMessage: "",
    loadingAttack: false,
    classNames: ""
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
    initialize()
  }, [])

  useEffect(() => {
    checkIfGameOver()
  }, [state.rivalPokemon])

  function initialize() {
    revivePokemon()
    const half = Math.ceil(appState.chosenPokemon.length / 2)
    setState(draft => {
      const splitArray = appState.chosenPokemon.slice(0, half)
      draft.myPokemon = splitArray
      const singlePokemon = splitArray[0]
      draft.selectedMyPokemon = singlePokemon
      console.log(singlePokemon)
      draft.myHP = singlePokemon.maxHP

      const rivalSplit = appState.chosenPokemon.slice(half)
      draft.rivalPokemon = rivalSplit
      const idx = 0
      const singleRivalPokemon = rivalSplit[idx]
      draft.selectedRivalPokemon = singleRivalPokemon
      draft.rivalPokemonIdx = idx
      draft.rivalHP = singleRivalPokemon.maxHP

      console.log(singleRivalPokemon)
      if (singlePokemon && singleRivalPokemon) draft.isLoading = false
    })
  }

  function revivePokemon() {
    console.log("REVIVE")
    appDispatch({
      type: "reviveAllPokemon"
    })
  }

  function deductDamage() {}

  function attacked({ name, type, damage }, attackedRival) {
    let superEffective = false
    let notVeryEffective = false

    if (state.loadingAttack == true) return // if user tries to attack in the middle of an attack, return
    setState(draft => {
      draft.loadingAttack = true
    })
    console.log(name)
    const hpAffected = attackedRival ? state.rivalHP : state.myHP
    const maxHPAffected = attackedRival ? state.selectedRivalPokemon.maxHP : state.selectedMyPokemon.maxHP

    //console.log(name, type, damage)
    const finalDamage = damage * multiplier
    let hpLeft = hpAffected - finalDamage
    let finalPercentage
    if (hpLeft < 0) {
      hpLeft = 0
      finalPercentage = "0%"
    } else finalPercentage = parseInt((parseInt(hpLeft) / parseInt(maxHPAffected)) * 100) + "%"

    let additionalMessage = ""
    if (superEffective) additionalMessage = " , it's super effective"
    else if (notVeryEffective) additionalMessage = " , it's not very effective"

    setState(draft => {
      if (attackedRival) {
        draft.rivalHP = hpLeft
        draft.rivalHpPercent = finalPercentage
        draft.topMessage = state.selectedMyPokemon.name + " used " + name + additionalMessage
      } else {
        draft.myHP = hpLeft
        draft.myHpPercent = finalPercentage
        draft.bottomMessage = state.selectedRivalPokemon.name + " used " + name + additionalMessage
      }
    })

    const delay = setTimeout(() => {
      if (hpLeft == 0) pokeDeath(attackedRival)
      if (attackedRival && hpLeft > 0) rivalAttackBack()
      setState(draft => {
        draft.loadingAttack = false
      })
    }, 1000)
  }

  // CPU attacks the player
  function rivalAttackBack() {
    const currentAttacker = state.selectedRivalPokemon
    const attack = randomAttack(currentAttacker)
    attacked(attack, false)
  }

  function randomAttack(pokemon) {
    let attackType = ""
    const tentatives = 50 // to prevent an infinite loop, try only 50 times
    let i = 0
    while (!(typeof attackType === "object") && i < tentatives) {
      attackType = pokemon?.attacks[getRandomProperty(pokemon?.attacks)]
      i++
    }
    const attack = attackType?.[Math.floor(Math.random() * attackType?.length)]
    return attack
  }

  function getRandomProperty(obj) {
    const keys = Object.keys(obj)

    return keys[Math.floor(Math.random() * keys.length)]
  }

  function pokeDeath(isRival) {
    console.log("Changing pokemon")
    if (isRival) {
      setState(draft => {
        draft.rivalPokemon[draft.rivalPokemonIdx].isDead = true
        draft.bottomMessage = draft.rivalPokemon[draft.rivalPokemonIdx].name + " fainted"
      })
      changePokemon(true)
      appDispatch({
        type: "pokemonDied",
        value: state.rivalPokemonIdx + 5 // + 5 because rival team is 5 numbers ahead
      })
    } else {
      setState(draft => {
        draft.myPokemon[draft.myPokemonIdx].isDead = true
      })
      changePokemon(false)
      appDispatch({
        type: "pokemonDied",
        value: state.myPokemonIdx
      })
    }

    checkIfGameOver()
  }

  function checkIfGameOver() {
    // if all pokemon are dead, show game over
    console.log("CHECKING GAME OVER")
    console.log(state.rivalPokemon)
    if (
      state.rivalPokemon.filter(pk => {
        return pk.isDead
      }).length >= 5 ||
      state.myPokemon.filter(pk => {
        return pk.isDead
      }).length >= 5
    ) {
      gameOver()
    }
  }

  function gameOver() {
    console.log("GAME OVER")
    setState(draft => {
      draft.gameOver = true
    })
  }

  useEffect(() => {
    revivePokemon()
  }, [state.gameOver])

  function changePokemon(isRival) {
    setState(draft => {
      let idx = isRival ? draft.rivalPokemonIdx : draft.myPokemonIdx
      idx++
      if (idx > 4) idx = 0
      const pokemon = isRival ? draft.rivalPokemon[idx] : draft.myPokemon[idx]
      if (isRival) {
        draft.rivalPokemonIdx = idx
        draft.selectedRivalPokemon = pokemon
        draft.rivalHP = pokemon.maxHP
        draft.rivalHpPercent = "100%" // TO CHANGE
      } else {
        draft.myPokemonIdx = idx
        draft.selectedMyPokemon = pokemon
        draft.myHP = pokemon.maxHP
        draft.myHpPercent = "100%" // TO CHANGE
      }
    })
  }

  function getAttackColor(attack) {
    return attack?.type ? colorTypes[`${attack.type.toLowerCase()}`] : "#eee" // we can add cc hex for opacity
  }

  return (
    <Page title="Battle">
      <CSSTransition timeout={330} in={state.gameOver} classNames="pokemonDetails" unmountOnExit>
        <GameOver />
      </CSSTransition>
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
                  <div className="d-flex flex-column-reverse">
                    <p>{state.bottomMessage}</p>
                    <p>{state.topMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="container">
            <div className={"row attacks " + (state.loadingAttack ? "loadingAttack" : "")}>
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.fast[0]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.fast[0], true)} className="col border font-weight-bold p-2">
                <Attack isLoading={state.isLoading} selectedMyPokemon={state.selectedMyPokemon} isSpecial={false} idx={0} />
              </div>
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.fast[1]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.fast[1], true)} className="col border font-weight-bold p-2">
                <Attack isLoading={state.isLoading} selectedMyPokemon={state.selectedMyPokemon} isSpecial={false} idx={1} />
              </div>{" "}
              <div className="w-100"></div>
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.special[0]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.special[0], true)} className="col border font-weight-bold p-2">
                <Attack isLoading={state.isLoading} selectedMyPokemon={state.selectedMyPokemon} isSpecial={true} idx={0} />
              </div>
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.special[1]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.special[1], true)} className="col border font-weight-bold p-2">
                <Attack isLoading={state.isLoading} selectedMyPokemon={state.selectedMyPokemon} isSpecial={true} idx={1} />
              </div>{" "}
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </Page>
  )
}

export default BattleHome
