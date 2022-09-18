import React, { useEffect, useContext } from "react"
import DispatchContext from "../Home/DispatchContext"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useImmer } from "use-immer"

export const colorTypes = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC"
}

function Pokemon(props) {
  const [state, setState] = useImmer({
    clicked: false
  })
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const typeColor = colorTypes[`${props.types[0].toLowerCase()}`]
  const typeSecondaryColor = props.types[1] ? colorTypes[`${props.types[1].toLowerCase()}`] : typeColor

  useEffect(() => {
    //navigate(`/Details/${5}`)
  }, [state.clicked])

  return (
    <div className="p-4">
      <Link style={{ textDecoration: "none", color: "#212529" }} onClick={() => appDispatch({ type: "openDetails" })} key={props.id} to={`/Details/${props.name}`}>
        <div className="pokemonCard" data-name={props.name}>
          <div className="text-center m-0 p-1 rounded-top bg-light text-dark">
            <b>{props.name + " #" + props.number}</b>
          </div>
          <figure className="align-bottom shadow">
            <img className="" src={`${props.image}`} />
          </figure>
          <div className="pokemonCardFooter position-absolute">
            <div className="w-50 float-left pl-2 rounded-left" style={{ backgroundColor: `${typeColor}` }}>
              <b>{props.types[0]}</b>
            </div>
            <div className="w-50 float-left pl-2 rounded-right" style={{ backgroundColor: `${typeSecondaryColor}` }}>
              <b>{props.types[1] ? props.types[1] : <span>&nbsp;</span>}</b>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Pokemon
