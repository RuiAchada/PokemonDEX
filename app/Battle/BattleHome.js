import React, { useContext, useEffect } from "react"
import Page from "../components/Page"
import StateContext from "../Home/StateContext"
import { CSSTransition } from "react-transition-group"
import { useImmer } from "use-immer"
import BattlePokeballs from "../components/BattlePokeballs"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PokemonImg from "../components/PokemonImg"
import HealthBar from "../components/HealthBar"

function BattleHome(props) {
  const appState = useContext(StateContext)

  // Math.floor(Math.random() * 100)
  
  const [state, setState] = useImmer({
    selectedRivalPokemon: { id: 1,
    image: "../res/loadingPokemon.png"},
    rivalPokemon: [],
    selectedMyPokemon: [],
    myPokemon: [],
    isLoading: true
  })

  return (
    <Page title="Battle">
          <SkeletonTheme baseColor="#dddddd" highlightColor="#e7e7e7">
      <div className="pb-4">  
      <div className="d-flex flex-column">
      <div className="d-flex flex-row">          
      <PokemonImg image={state.selectedRivalPokemon.image} isLoading={state.isLoading} />
      <HealthBar />
      </div>
      <div className="d-flex flex-row">
<BattlePokeballs />
</div>
</div>

<div className="d-flex flex-column">
      <div className="d-flex flex-row-reverse">     
      <BattlePokeballs />
      <h4>Name</h4>
      </div>
      <div className="d-flex flex-row-reverse">
      <PokemonImg image={state.selectedRivalPokemon.image} isLoading={state.isLoading} />
      <HealthBar />
      </div>
     
      </div>

      <div className="container">
  <div className="row">
    <div className="col border">Column</div>
    <div className="col border">Column</div>
    <div className="w-100"></div>
    <div className="col border">Column</div>
    <div className="col border">Column</div>
  </div>
</div>

        
      </div>
      </SkeletonTheme>
    </Page>
    
  )
}

export default BattleHome
