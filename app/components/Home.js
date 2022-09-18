import React, { useContext, useEffect } from "react"
import Page from "./Page"
import StateContext from "../Home/StateContext"
import SearchBar from "./SearchBar"
import PokemonGrid from "./PokemonGrid"
import PokemonDetails from "./PokemonDetails"
import { CSSTransition } from "react-transition-group"
import { useImmer } from "use-immer"

function Home() {
  const appState = useContext(StateContext)

  /*const [state, setState] = useImmer({
    isDetailOpen: true
  })*/

  return (
    <Page title="Pokedex">
      <SearchBar />
      <div className="d-flex flex-wrap">
        <PokemonGrid />
      </div>
      <CSSTransition timeout={330} in={appState.isDetailOpen} classNames="search-overlay" unmountOnExit>
        <PokemonDetails />
      </CSSTransition>
    </Page>
  )
}

export default Home
