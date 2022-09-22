import React from "react"
import { Link } from "react-router-dom"

function Attack(props) {
  return (
    <b>{props.isLoading || !props.selectedMyPokemon || !props.selectedMyPokemon.attacks.fast[props.idx] ? " " : props.selectedMyPokemon.attacks.fast[props.idx].name}</b>
  )
}

export default Attack
