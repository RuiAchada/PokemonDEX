import React, { useContext, useEffect } from "react"
import Page from "../components/Page"
import StateContext from "../Home/StateContext"
import { CSSTransition } from "react-transition-group"
import { useImmer } from "use-immer"
import BattlePokeballs from "../components/BattlePokeballs"

function BattleHome() {
  const appState = useContext(StateContext)

  return (
    <Page title="Battle">
      <div>
        <BattlePokeballs />
      </div>
    </Page>
  )
}

export default BattleHome
