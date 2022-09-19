import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../Home/DispatchContext"
import StateContext from "../Home/StateContext"

function Header(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  return (
    <header className="shadow header-bar myHeader mb-3 sticky-top">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            {" "}
            PokeDex{" "}
          </Link>
        </h4>
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/Battle" className="text-white">
            {" "}
            Battle{" "}
          </Link>
        </h4>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="d-flex flex-row">
          <figure onClick={() => appDispatch({ type: "selectBall", value: 0 })} className={(appState.selectedBall == 0 ? "pokeballSelectedFigure" : "") + " " + (appState.chosenPokemon[0] ? "pokeBallFilledFigure  shadow align-bottom rounded-circle overflow-hidden" : "") + " mr-2"}>
            <img className={"" + (appState.selectedBall == 0 ? "pokeballSelected" : "pokeball")} src={appState.pokeballsImg[0]} />
          </figure>
          <figure onClick={() => appDispatch({ type: "selectBall", value: 1 })} className={(appState.selectedBall == 1 ? "pokeballSelectedFigure" : "") + " " + (appState.chosenPokemon[1] ? "pokeBallFilledFigure  shadow align-bottom rounded-circle overflow-hidden" : "") + " mr-2"}>
            <img className={"" + (appState.selectedBall == 1 ? "pokeballSelected" : "pokeball")} src={appState.pokeballsImg[1]} />
          </figure>
          <figure onClick={() => appDispatch({ type: "selectBall", value: 2 })} className={(appState.selectedBall == 2 ? "pokeballSelectedFigure" : "") + " " + (appState.chosenPokemon[2] ? "pokeBallFilledFigure  shadow align-bottom rounded-circle overflow-hidden" : "") + " mr-2"}>
            <img className={"" + (appState.selectedBall == 2 ? "pokeballSelected" : "pokeball")} src={appState.pokeballsImg[2]} />
          </figure>
          <figure onClick={() => appDispatch({ type: "selectBall", value: 3 })} className={(appState.selectedBall == 3 ? "pokeballSelectedFigure" : "") + " " + (appState.chosenPokemon[3] ? "pokeBallFilledFigure  shadow align-bottom rounded-circle overflow-hidden" : "") + " mr-2"}>
            <img className={"" + (appState.selectedBall == 3 ? "pokeballSelected" : "pokeball")} src={appState.pokeballsImg[3]} />
          </figure>
          <figure onClick={() => appDispatch({ type: "selectBall", value: 4 })} className={(appState.selectedBall == 4 ? "pokeballSelectedFigure" : "") + " " + (appState.chosenPokemon[4] ? "pokeBallFilledFigure  shadow align-bottom rounded-circle overflow-hidden" : "") + " mr-2"}>
            <img className={"" + (appState.selectedBall == 4 ? "pokeballSelected" : "pokeball")} src={appState.pokeballsImg[4]} />
          </figure>
          <div className="mr-2">135</div>
          <div className="mr-2">VS</div>
          <div className="mr-2">103</div>
          <figure onClick={() => appDispatch({ type: "selectBall", value: 5 })} className={(appState.selectedBall == 5 ? "pokeballSelectedFigure" : "") + " " + (appState.chosenPokemon[5] ? "pokeBallFilledFigure mr-2 shadow align-bottom rounded-circle overflow-hidden" : "") + " "}>
            <img className={"" + (appState.selectedBall == 5 ? "pokeballSelected" : "pokeball")} src={appState.pokeballsImg[5]} />
          </figure>
          <figure onClick={() => appDispatch({ type: "selectBall", value: 6 })} className={(appState.selectedBall == 6 ? "pokeballSelectedFigure" : "") + " " + (appState.chosenPokemon[6] ? "pokeBallFilledFigure mr-2 shadow align-bottom rounded-circle overflow-hidden" : "") + " "}>
            <img className={"" + (appState.selectedBall == 6 ? "pokeballSelected" : "pokeball")} src={appState.pokeballsImg[6]} />
          </figure>
          <figure onClick={() => appDispatch({ type: "selectBall", value: 7 })} className={(appState.selectedBall == 7 ? "pokeballSelectedFigure" : "") + " " + (appState.chosenPokemon[7] ? "pokeBallFilledFigure mr-2 shadow align-bottom rounded-circle overflow-hidden" : "") + " "}>
            <img className={"" + (appState.selectedBall == 7 ? "pokeballSelected" : "pokeball")} src={appState.pokeballsImg[7]} />
          </figure>
          <figure onClick={() => appDispatch({ type: "selectBall", value: 8 })} className={(appState.selectedBall == 8 ? "pokeballSelectedFigure" : "") + " " + (appState.chosenPokemon[8] ? "pokeBallFilledFigure mr-2 shadow align-bottom rounded-circle overflow-hidden" : "") + " "}>
            <img className={"" + (appState.selectedBall == 8 ? "pokeballSelected" : "pokeball")} src={appState.pokeballsImg[8]} />
          </figure>
          <figure onClick={() => appDispatch({ type: "selectBall", value: 9 })} className={(appState.selectedBall == 9 ? "pokeballSelectedFigure" : "") + " " + (appState.chosenPokemon[9] ? "pokeBallFilledFigure mr-2 shadow align-bottom rounded-circle overflow-hidden" : "") + " "}>
            <img className={"" + (appState.selectedBall == 9 ? "pokeballSelected" : "pokeball")} src={appState.pokeballsImg[9]} />
          </figure>
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
