import React, { useEffect, useContext } from "react"
import StateContext from "../Home/StateContext"

function BattlePokeballs(props) {
  const appState = useContext(StateContext)
  const pokeballsNumber = [1, 2, 3, 4] // temporary

  return (
    <div className="d-flex flex-row">
      {pokeballsNumber.map(x => {
        return <img className="p-2 pokeball" src={appState.pokeballsImg.myBalls[0]} />
      })}
    </div>
  )
}

export default BattlePokeballs
