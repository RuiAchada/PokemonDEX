import React from "react"

function HealthBar(props) {
  return (
    <div className="d-flex flex-column">
      <h6>HP</h6>
      <div className="healthBarExt border">
        <div className="healthBar bg-success"></div>
        <div>
          {props.hp}/{props.maxHP}
        </div>
      </div>
    </div>
  )
}

export default HealthBar
