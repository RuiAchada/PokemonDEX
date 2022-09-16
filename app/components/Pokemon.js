import React, { useEffect } from "react"

function Pokemon(props) {
  return (
    <div className="p-4">
      <h3>{props.name}</h3>
      <div className="pokemonCard">
        <img src={`${props.image}`} />
      </div>
      <br />
      <b>Type:</b>
      <p>{props.types}</p>
      <br />
    </div>
  )
}

export default Pokemon
