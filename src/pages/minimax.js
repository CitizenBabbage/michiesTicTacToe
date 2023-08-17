import GameShell from "../components/GameShell.js"
import React, { useState } from 'react';



export default function Minimax( props ) {

  const [foe, setFoe] = useState("minimax")
  return (
      <div>
      <GameShell devMode = {props.devMode} foe = {foe} setFoe = { setFoe } />
      </div>
  )
}
