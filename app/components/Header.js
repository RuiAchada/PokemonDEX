import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import StateContext from "../StateContext"

function Header(props) {
  const appState = useContext(StateContext)

  return (
    <header className="header-bar myHeader mb-3">
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
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <div className="p-2">135</div>
          <div className="p-2">VS</div>
          <div className="p-2">103</div>
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
          <img className="p-2 pokeball" src={appState.user.avatar} />
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
