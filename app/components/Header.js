import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../Home/DispatchContext"
import StateContext from "../Home/StateContext"
import PokeballFigure from "./PokeballFigure"

function Header(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  return (
    <header className="shadow header-bar myHeader mb-3 sticky-top">
      <div className="container d-flex flex-md-row p-3">
        <div className="container">
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <Link to="/" className="text-white">
              {" "}
              PokeDex{" "}
            </Link>
          </h4>
        </div>
        <div>
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <Link to="/Battle" className="text-white">
              {" "}
              Battle{" "}
            </Link>
          </h4>
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="d-flex flex-row">
          <PokeballFigure index={0} selectedBall={appState.selectedBall} pokemon={appState.chosenPokemon[0]} image={appState.pokeballsImg} />
          <PokeballFigure index={1} selectedBall={appState.selectedBall} pokemon={appState.chosenPokemon[1]} image={appState.pokeballsImg} />
          <PokeballFigure index={2} selectedBall={appState.selectedBall} pokemon={appState.chosenPokemon[2]} image={appState.pokeballsImg} />
          <PokeballFigure index={3} selectedBall={appState.selectedBall} pokemon={appState.chosenPokemon[3]} image={appState.pokeballsImg} />
          <PokeballFigure index={4} selectedBall={appState.selectedBall} pokemon={appState.chosenPokemon[4]} image={appState.pokeballsImg} />
          <div className="mr-2">135</div>
          <div className="mr-2">VS</div>
          <div className="mr-2">103</div>
          <PokeballFigure index={5} selectedBall={appState.selectedBall} pokemon={appState.chosenPokemon[5]} image={appState.pokeballsImg} />
          <PokeballFigure index={6} selectedBall={appState.selectedBall} pokemon={appState.chosenPokemon[6]} image={appState.pokeballsImg} />
          <PokeballFigure index={7} selectedBall={appState.selectedBall} pokemon={appState.chosenPokemon[7]} image={appState.pokeballsImg} />
          <PokeballFigure index={8} selectedBall={appState.selectedBall} pokemon={appState.chosenPokemon[8]} image={appState.pokeballsImg} />
          <PokeballFigure index={9} selectedBall={appState.selectedBall} pokemon={appState.chosenPokemon[9]} image={appState.pokeballsImg} />
        </div>

        {/*<div className="d-flex flex-row-reverse">
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
        </div>*/}
      </div>
    </header>
  )
}

export default Header
