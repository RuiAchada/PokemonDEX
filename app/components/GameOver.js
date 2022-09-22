import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function ComponentName() {
  return (
    <div className="gameOver">
      <div className="gameOverBody">
        <h1>Game Over</h1>
        <Link to="/" className="mx-1">
          PokeDex
        </Link>
        <Link to="/Battle" className="mx-1" onClick={() => window.location.reload()}>
          Rematch
        </Link>
      </div>
    </div>
  )
}

export default ComponentName
