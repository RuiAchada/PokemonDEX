import React, { useEffect, useContext } from "react"
import { useImmer } from "use-immer"
import DispatchContext from "../Home/DispatchContext"
import StateContext from "../Home/StateContext"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useQuery, useLazyQuery, gql } from "@apollo/client"
import { SEARCH_POKEMON } from "../backend/queries"

function PokemonDetails() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const { name } = useParams()

  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    show: "loading", // can be loading icon or show the results
    requestCount: 0,
    isLoading: true,
    isError: false
  })

  useEffect(() => {
    setState(draft => {
      draft.show = "loading"
    })
    console.log("loaded pokemon details")
    lazyLoadPokemon()
  }, [name])

  const [lazyLoadPokemon, { loading, error, data }] = useLazyQuery(SEARCH_POKEMON, {
    notifyOnNetworkStatusChange: true,
    variables: { name },
    onCompleted: data => {}
  })

  useEffect(() => {
    if (data && loading) {
      // loading
    }
    if (data && error) {
      // error
      setState(draft => {
        draft.isError = true
      })
    }

    if (data && !loading) {
      console.log(data)
      setState(draft => {
        draft.isLoading = loading
        draft.show = "results"
      })
    }
  }, [data])

  return (
    <div className="pokemonDetails shadow">
      <div className="pokemonDetails-top shadow-sm">
        <div className="container container--narrow">
          <b>{Boolean(!data) ? "Loading..." : data.pokemon.name + " #" + data.pokemon.number}</b>
          <span onClick={() => appDispatch({ type: "closeDetails" })} className="close-live-search">
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>

      <div className="pokemonDetails-bottom">
        <div className="container container--narrow py-3">
          <div className={"circle-loader " + (state.show == "loading" ? "circle-loader--visible" : "")}></div>
          {Boolean(data && !loading && !error) && (
            <div className={"live-search-results " + (state.show == "results" ? "live-search-results--visible" : "")}>
              <figure className="align-bottom">
                <img className="shadow" src={`${data.pokemon.image}`} />
              </figure>

              <div>Characteristics</div>

              <div>Weaknesses</div>

              <div>Resistant</div>

              <div>Evolutions</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
