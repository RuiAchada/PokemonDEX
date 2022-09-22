import React from "react"
import { Link } from "react-router-dom"

function Attack(props) {
  return (
    <div>
      {Boolean(!props.isSpecial) && <b>{props.isLoading || !props.selectedMyPokemon || !props.selectedMyPokemon.attacks.fast[props.idx] ? " " : props.selectedMyPokemon.attacks.fast[props.idx].name}</b>}
      {Boolean(props.isSpecial) && <b>{props.isLoading || !props.selectedMyPokemon || !props.selectedMyPokemon.attacks.special[props.idx] ? " " : props.selectedMyPokemon.attacks.special[props.idx].name}</b>}
    </div>
  )
}

export default Attack
