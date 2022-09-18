import React, { useContext, useEffect } from "react"
import Page from "./Page"
import DispatchContext from "../Home/DispatchContext"
import StateContext from "../Home/StateContext"
import SearchBar from "./SearchBar"
import PokemonGrid from "./PokemonGrid"
import PokemonDetails from "./PokemonDetails"
import { CSSTransition } from "react-transition-group"
import { useParams, Link, useNavigate } from "react-router-dom"

function Home() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const { name } = useParams()

  useEffect(() => {
    if (name) appDispatch({ type: "openDetails" })
    else appDispatch({ type: "closeDetails" })
  }, [name])

  return (
    <Page title="Home">
      <SearchBar />
      <div className="d-flex flex-wrap">
        <PokemonGrid />
      </div>
      <CSSTransition timeout={330} in={appState.isDetailOpen} classNames="pokemonDetails" unmountOnExit>
        <PokemonDetails />
      </CSSTransition>
    </Page>
  )
}

export default Home
