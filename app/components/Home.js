import React, { useContext, useEffect } from "react"
import Page from "./Page"
import StateContext from "../StateContext"
import { useQuery, gql } from "@apollo/client"
import Pokemon from "./Pokemon"
import { GET_POKEMONS } from "../backend/queries"

function Home() {
  const appState = useContext(StateContext)
  const first = 20

  function DisplayPokemon() {
    const { loading, error, data } = useQuery(GET_POKEMONS, {
      variables: { first: first || first !== null }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    console.log(data)
    return data.pokemons.map(({ id, name, image, types }) => <Pokemon key={id} name={name} image={image} types={types} />)
  }

  return (
    <Page title="Your feed">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="Search Pokemon..." />
          <span className="close-live-search">
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        <DisplayPokemon />
      </div>
    </Page>
  )
}

export default Home
