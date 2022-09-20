import React, { useContext } from "react"
import DispatchContext from "../Home/DispatchContext"

// props: index, image, pokemon, selectedBall
function PokeballFigure(props) {
  const appDispatch = useContext(DispatchContext)
  return (
    <figure onClick={() => appDispatch({ type: "selectBall", value: props.index })} className={(props.selectedBall == props.index ? "pokeballSelectedFigure" : "") + " " + (props.pokemon ? "pokeBallFilledFigure  shadow align-bottom rounded-circle overflow-hidden" : "") + " mr-2"}>
      <img className={"" + (props.selectedBall == props.index ? "pokeballSelected" : "pokeball")} src={props.pokemon ? props.pokemon.image : props.image} />
    </figure>
  )
}

export default PokeballFigure
