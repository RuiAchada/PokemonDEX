import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import StateContext from "../Home/StateContext"

function Header(props) {
  const appState = useContext(StateContext)

  return (
    <header className="header-bar myHeader mb-3 sticky-top">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            {" "}
            PokeDex{" "}
          </Link>
        </h4>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="d-flex flex-row">
          <img className="p-2 pokeball" src={appState.pokeballsImg.myBalls[0]} />
          <img className="p-2 pokeball" src={appState.pokeballsImg.myBalls[1]} />
          <img className="p-2 pokeball" src={appState.pokeballsImg.myBalls[2]} />
          <img className="p-2 pokeball" src={appState.pokeballsImg.myBalls[3]} />
          <img className="p-2 pokeball" src={appState.pokeballsImg.myBalls[4]} />
          <div className="p-2">135</div>
          <div className="p-2">VS</div>
          <div className="p-2">103</div>
          <img className="p-2 pokeball" src={appState.pokeballsImg.rivalBalls[0]} />
          <img className="p-2 pokeball" src={appState.pokeballsImg.rivalBalls[1]} />
          <img className="p-2 pokeball" src={appState.pokeballsImg.rivalBalls[2]} />
          <img className="p-2 pokeball" src={appState.pokeballsImg.rivalBalls[3]} />
          <img className="p-2 pokeball" src={appState.pokeballsImg.rivalBalls[4]} />
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
