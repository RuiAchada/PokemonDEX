import React, { useContext, useEffect } from "react"
import Page from "./Page"
import StateContext from "../StateContext"
import SearchBar from "./SearchBar"
import PokemonGrid from "./PokemonGrid"

function Home() {
  const appState = useContext(StateContext)

  return (
    <Page title="Pokedex">
      <SearchBar />
      <div className="d-flex flex-wrap">
        <PokemonGrid />
      </div>
    </Page>
  )
}

export default Home
