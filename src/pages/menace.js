import GameShell from "../components/GameShell.js"
import React, { useState } from 'react';



export default function Menace( props ) {

  const [foe, setFoe] = useState("menace")
  return (
      <div>
      <GameShell devMode = {props.devMode} foe = {foe} setFoe = { setFoe }/>
      </div>
  )
}

