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
import Attack from "../components/Attack"

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
    selectedRivalPokemon: { image: "../res/loadingPokemon.png" },
    rivalHP: 0,
    rivalHpPercent: "100%",
    myHP: 0,
    myHpPercent: "100%",
    rivalPokemon: [],
    rivalPokemonIdx: 0,
    selectedMyPokemon: { image: "../res/loadingPokemon.png" },
    myPokemon: [],
    myPokemonIdx: 0,
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
    let myPokemon, rivalPokemon
    setState(draft => {      
        draft.myPokemon = appState.chosenPokemon.slice(0, half)
        myPokemon = draft.myPokemon[0]
        draft.selectedMyPokemon = myPokemon
        draft.myHP = myPokemon.maxHP
      
        draft.rivalPokemon = appState.chosenPokemon.slice(half)
        const idx = 0
        rivalPokemon = draft.rivalPokemon[idx]
        draft.selectedRivalPokemon = rivalPokemon
        draft.rivalPokemonIdx = idx
        draft.rivalHP = rivalPokemon.maxHP      
      
      console.log(myPokemon)
      console.log(rivalPokemon)
      if(myPokemon && rivalPokemon)
        draft.isLoading = false
    })
  }, [])

  function deductDamage() {}

  function attacked({ name, type, damage }, attackedRival) {
    const hpAffected = attackedRival ? state.rivalHP : state.myHP
    const maxHPAffected = attackedRival ? state.selectedRivalPokemon.maxHP : state.selectedMyPokemon.maxHP

    console.log(name, type, damage)
    const finalDamage = damage * multiplier
    let hpLeft = hpAffected - finalDamage
    let finalPercentage
    if (hpLeft < 0) {
      hpLeft = 0
      finalPercentage = "0%"
    } else finalPercentage = parseInt((parseInt(hpLeft) / parseInt(maxHPAffected)) * 100) + "%"

    setState(draft => {
      if(attackedRival) {
        draft.rivalHP = hpLeft
        draft.rivalHpPercent = finalPercentage
      }
      else {
        draft.myHP = hpLeft
draft.myHpPercent = finalPercentage
      }

    })

    if (hpLeft == 0 && attackedRival) rivalDeath()
    if(hpLeft == 0 && !attackedRival) myDeath()
    if(attackedRival) rivalAttackBack()
  }

  // CPU attacks the player
  function rivalAttackBack() {
    const currentAttacker = state.selectedRivalPokemon
    const attack = randomAttack(currentAttacker)
    attacked(attack, false)
  }

  function randomAttack(pokemon) {
    console.log(pokemon)
    let attackType = ""
    const tentatives = 50 // to prevent an infinite loop, try only 50 times
    let i = 0
    while(!(typeof attackType === 'object') && i < tentatives) {     
      attackType = pokemon?.attacks[getRandomProperty(pokemon?.attacks)]
      i++
    }
const attack = attackType?.[Math.floor(Math.random()*attackType?.length)]
console.log(attack)
    return attack
  }

 function getRandomProperty(obj) {
    const keys = Object.keys(obj);
  
    return keys[Math.floor(Math.random() * keys.length)];
  }
  

  function rivalDeath() {
    console.log("Changing rival")
    setState(draft => {     
      draft.rivalPokemon[draft.rivalPokemonIdx].isDead = true       
  })
  changePokemon(true)
  }

  function myDeath() {
    console.log("Changing my pokemon")
    setState(draft => {     
      draft.myPokemon[draft.myPokemonIdx].isDead = true       
  })
  changePokemon(false)
  }

 /* function changeRival() {
    setState(draft => { 
    let idx = draft.rivalPokemonIdx
    idx++
    if(idx > 4) idx = 0
    console.log(idx)
    const rivalPokemon = draft.rivalPokemon[idx]
    draft.rivalPokemonIdx = idx      
    draft.selectedRivalPokemon = rivalPokemon
    draft.rivalHP = rivalPokemon.maxHP   
    draft.rivalHpPercent = "100%"   
  })
  }*/

  function changePokemon(isRival) {
    setState(draft => { 
      let idx = isRival ? draft.rivalPokemonIdx : draft.myPokemonIdx
      idx++
      if(idx > 4) idx = 0
      console.log(idx)
      const pokemon = isRival ? draft.rivalPokemon[idx] : draft.myPokemon[idx]
      if(isRival) {
        draft.rivalPokemonIdx = idx      
        draft.selectedRivalPokemon = pokemon
        draft.rivalHP = pokemon.maxHP   
        draft.rivalHpPercent = "100%" // TO CHANGE
      }
      else {
        draft.myPokemonIdx = idx      
        draft.selectedMyPokemon = pokemon
        draft.myHP = pokemon.maxHP   
        draft.myHpPercent = "100%" // TO CHANGE
      }  
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
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.fast[0]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.fast[0], true)} className="col border font-weight-bold p-2">
               <Attack isLoading={state.isLoading} selectedMyPokemon={state.selectedMyPokemon} idx={0} />
              </div>
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.fast[1]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.fast[1], true)} className="col border font-weight-bold p-2">
              <Attack isLoading={state.isLoading} selectedMyPokemon={state.selectedMyPokemon} idx={1} />
              </div>{" "}
              <div className="w-100"></div>
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.special[0]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.special[0], true)} className="col border font-weight-bold p-2">
              <Attack isLoading={state.isLoading} selectedMyPokemon={state.selectedMyPokemon} idx={2} />
              </div>
              <div style={{ backgroundColor: getAttackColor(state.selectedMyPokemon?.attacks?.special[1]) }} onClick={e => attacked(state.selectedMyPokemon.attacks.special[1], true)} className="col border font-weight-bold p-2">
              <Attack isLoading={state.isLoading} selectedMyPokemon={state.selectedMyPokemon} idx={3} />
              </div>{" "}
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </Page>
  )
}

export default BattleHome
