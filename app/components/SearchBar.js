import React, { useEffect, useContext } from "react"
import DispatchContext from "../Home/DispatchContext"
import { useImmer } from "use-immer"
import StateContext from "../Home/StateContext"
import { useQuery, useLazyQuery, gql } from "@apollo/client"

import { SEARCH_POKEMONS } from "../backend/queries"

function SearchBar() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    show: "neither", // can be loading icon or show the results
    requestCount: 0
  })

  useEffect(() => {
    document.addEventListener("keyup", searchKeyPressHandler)
    // clean up function. If search is closed we dont want to continue listening
    return () => document.removeEventListener("keyup", searchKeyPressHandler)
  }, [])

  // search (not fuzzy)
  /*const [search, { loading, error, data }] = useLazyQuery(SEARCH_POKEMONS, {
    notifyOnNetworkStatusChange: true,
    variables: { name: state.searchTerm },
    fetchPolicy: "network-only", // Doesn't check cache before making a network request
    onCompleted: data => {
      console.log(data)
      appDispatch({ type: "loadedPokemon", value: data.pokemon })
    }
  })*/

  useEffect(() => {
    if (state.searchTerm.trim()) {
      // show the loading before sending the request
      setState(draft => {
        draft.show = "loading"
      })
      const delay = setTimeout(() => {
        appDispatch({
          type: "pokemonFiltered",
          value: appState.pokemonList.filter(pok => {
            return pok.name.trim().toLowerCase().includes(state.searchTerm)
          })
        })
        setState(draft => {
          draft.requestCount++ // increment request to have query in a different useEffect
        })
      }, 200)
      //clean up function to cancel time out (DEBOUNCE)
      return () => clearTimeout(delay)
    } else {
      // if string is empty load all pokemon from the cached list
      appDispatch({
        type: "pokemonFiltered",
        value: appState.pokemonList
      })
    }
  }, [state.searchTerm])

  function searchKeyPressHandler(e) {
    if (e.keyCode == 27) {
      // 27 ESC key - clear text
      const tbxSearch = document.getElementById("live-search-field")
      tbxSearch.value = ""
      setState(draft => {
        draft.searchTerm = ""
      })
    }
  }

  function handleInput(e) {
    const value = e.target.value
    setState(draft => {
      draft.searchTerm = value.trim()
    })
  }

  return (
    <div className="search-overlay-top">
      <div className="container container--narrow">
        <label htmlFor="live-search-field" className="search-overlay-icon">
          <i className="fas fa-search"></i>
        </label>
        <input id="live-search-field" onChange={handleInput} autoFocus type="text" autoComplete="off" className="live-search-field" placeholder="Search Pokemon..." />
        {/*<span className="close-live-search">
          <i className="fas fa-times-circle"></i>
  </span>*/}
      </div>
    </div>
  )
}

export default SearchBar
