import React, { useState, useReducer, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer" // to replace React useReducer
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { useQuery, gql } from "@apollo/client"

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

// Var
import { client } from "./backend/apollo-connection"

// My components
import Header from "./components/Header"
import Footer from "./components/Footer"
import FlashMessages from "./components/FlashMessages"
import NotFound from "./components/NotFound"
import Home from "./components/Home"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("complexappToken"),
      username: localStorage.getItem("complexappUsername"),
      avatar: "./res/pokeball64.png" //localStorage.getItem("complexappAvatar")
    },
    isSearchOpen: false
  }

  // how the state data of the app should change for particular actions
  // idea is that any time you call dispatch, what's in parentheses will get passed along into the reducer function as the action
  function ourReducer(draft, action) {
    // draft gives a copy of state (using immer)
    // state - current / previous state value
    switch (action.type) {
      case "login":
        //return { loggedIn: true, flashMessages: state.flashMessages } // in React we need to return a new object, that's why we need state.flashMessages
        // immer gives us a carbon copy of state and we can mutate it
        draft.loggedIn = true
        draft.user = action.data
        return // or break
      case "logout":
        //return { loggedIn: false, flashMessages: state.flashMessages }
        draft.loggedIn = false
        return
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
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState) // dispatch - used to call an update state. (function, initial value for state)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("complexappToken", state.user.token) // name, value
      localStorage.setItem("complexappUsername", state.user.username)
      localStorage.setItem("complexappAvatar", state.user.avatar)
    } else {
      localStorage.removeItem("complexappToken") // name, value
      localStorage.removeItem("complexappUsername")
      localStorage.removeItem("complexappAvatar")
    }
  }, [state.loggedIn])

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
