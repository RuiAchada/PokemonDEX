import React, { useState, useReducer, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer" // to replace React useReducer
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { useQuery, useLazyQuery, gql } from "@apollo/client"
import { SEARCH_POKEMON } from "./backend/queries"

import StateContext from "./Home/StateContext"
import DispatchContext from "./Home/DispatchContext"

// Var
import { client } from "./backend/apollo-connection"

// My components
import Header from "./components/Header"
import Footer from "./components/Footer"
import FlashMessages from "./components/FlashMessages"
import NotFound from "./components/NotFound"
import Home from "./components/Home"
import PokemonDetails from "./components/PokemonDetails"
import BattleHome from "./Battle/BattleHome"

function Main() {
  const initialState = {
    myTeam: [],
    rivalTeam: [],
    flashMessages: [],
    pokeballsImg: {
      myBalls: ["../res/pokeball64.png", "../res/pokeball64.png", "../res/pokeball64.png", "../res/pokeball64.png", "../res/pokeball64.png"],
      rivalBalls: ["../res/pokeball64.png", "../res/pokeball64.png", "../res/pokeball64.png", "../res/pokeball64.png", "../res/pokeball64.png"]
    },
    pokemonList: [],
    pokemonFiltered: [],
    isDetailOpen: false
  }

  // how the state data of the app should change for particular actions
  // idea is that any time you call dispatch, what's in parentheses will get passed along into the reducer function as the action
  function ourReducer(draft, action) {
    // draft gives a copy of state (using immer)
    // state - current / previous state value
    switch (
      action.type // immer gives us a carbon copy of state and we can mutate it
    ) {
      case "flashMessage":
        //return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value) }
        draft.flashMessages.push(action.value)
        return
      case "openSearch":
        draft.isSearchOpen = true
        return
      case "closeSearch":
        draft.isSearchOpen = false
        return
      case "pokemonList":
        draft.pokemonList = action.value
        draft.pokemonFiltered = action.value // update also filtered pokemon on first load
        console.log("first load")
        return
      case "pokemonFiltered":
        draft.pokemonFiltered = action.value
        console.log("filtered")
        return
      case "openDetails":
        draft.isDetailOpen = true
        return
      case "closeDetails":
        draft.isDetailOpen = false
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState) // dispatch - used to call an update state. (function, initial value for state)

  useEffect(() => {
    if (state.myTeam) {
      localStorage.setItem("PokedexMyTeam", state.myTeam)
    } else {
      localStorage.removeItem("PokedexMyTeam")
    }
  }, [state.myTeam])

  useEffect(() => {
    if (state.rivalTeam) {
      localStorage.setItem("PokedexRivalTeam", state.rivalTeam)
    } else {
      localStorage.removeItem("PokedexRivalTeam")
    }
  }, [state.rivalTeam])

  // <ExampleContext.Provider value={{ state, dispatch }}>  is not optimal for performance
  // because anytime these objects change, the components will re-render to have the latest value of state and dispatch
  // also, some components will only need access to dispatch and not state
  // so the React team recommends to have 2 context providers.
  // 1 for state and other for dispatch.

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <FlashMessages messages={state.flashMessages} />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Details/:name" element={<Home />} />
              <Route path="/Battle" element={<BattleHome />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ApolloProvider>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
