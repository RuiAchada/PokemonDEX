import React from "react"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function PokemonImg(props) {
  return (
    <SkeletonTheme baseColor="#dddddd" highlightColor="#e7e7e7">
    <div>
    {Boolean(props.isLoading) && (
      <Skeleton duration={0.5} height={250} width={250} />
    )}
    {Boolean(!props.isLoading) && (
      <figure className="align-bottom">       
      <img className="pokemonBattleImg" src={`${props.image}`} />
    </figure>
    )}
   </div>
   </SkeletonTheme>
  )
}

export default PokemonImg
