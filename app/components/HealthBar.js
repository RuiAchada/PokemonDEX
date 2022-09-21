import React from "react"

//const hp = "20%"

function HealthBar(props) {
  return (
    <div className="d-flex flex-column">
      <h6>HP</h6>
      <div className=" rounded healthBarExt border">
        <div style={{ width: props.hpPercentage }} className=" rounded healthBar bg-success"></div>
        <div>
          {props.hp}/{props.maxHP}
        </div>
      </div>
    </div>
  )
}

export default HealthBar
