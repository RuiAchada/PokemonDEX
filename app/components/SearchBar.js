import React, { useEffect, useContext } from "react"
import DispatchContext from "../DispatchContext"
import { useImmer } from "use-immer"
import { useQuery, useLazyQuery, gql } from "@apollo/client"

import { SEARCH_POKEMONS } from "../backend/queries"

function SearchBar() {
  const appDispatch = useContext(DispatchContext)

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

  const [search, { loading, error, data }] = useLazyQuery(SEARCH_POKEMONS, {
    notifyOnNetworkStatusChange: true,
    variables: { name: state.searchTerm },
    fetchPolicy: "network-only", // Doesn't check cache before making a network request
    onCompleted: data => {
      console.log(data)
      appDispatch({ type: "loadedPokemon", value: data.pokemon })
    }
  })

  useEffect(() => {
    if (state.searchTerm.trim()) {
      // show the loading before sending the request
      setState(draft => {
        draft.show = "loading"
      })
      const delay = setTimeout(() => {
        search()
        setState(draft => {
          draft.requestCount++ // increment request to have query in a different useEffect
        })
      }, 700)
      //clean up function to cancel time out (DEBOUNCE)
      return () => clearTimeout(delay)
    } else {
      // if string is empty
      setState(draft => {
        draft.show = "neither"
      })
    }
  }, [state.searchTerm])

  function searchKeyPressHandler(e) {
    if (e.keyCode == 27) {
      // 27 ESC key
      //appDispatch({ type: "closeSearch" })
    }
  }

  function handleInput(e) {
    const value = e.target.value
    setState(draft => {
      // usually we dont mutate state but with immer we can, using this draft
      const trim = value.trim()
      const modifiedString = trim.charAt(0).toUpperCase() + trim.slice(1).toLowerCase() // we have to capitalize the first letter because that's how the API has the pokemon names
      draft.searchTerm = modifiedString
    })
  }

  return (
    <div className="search-overlay-top">
      <div className="container container--narrow">
        <label htmlFor="live-search-field" className="search-overlay-icon">
          <i className="fas fa-search"></i>
        </label>
        <input onChange={handleInput} autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="Search Pokemon..." />
        {/*<span className="close-live-search">
          <i className="fas fa-times-circle"></i>
  </span>*/}
      </div>
    </div>
  )
}

export default SearchBar
