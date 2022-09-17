import React, { useEffect } from "react"

function Container(props) {
  return <div className={"container " + (props.wide ? "" : "container--narrow")}>{props.children}</div>
}

export default Container
