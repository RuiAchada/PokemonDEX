import React, { useEffect } from "react"
import Container from "./Container"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | Pokedex` // change tab title
    window.scrollTo(0, 0) // scroll to the top
  }, [props.title])

  return <Container wide={props.wide}>{props.children}</Container>
}

export default Page
