import GameShell from "../components/GameShell.js"
import React, { useState } from 'react';



export default function Huris( props ) {

  const [foe, setFoe] = useState("huris")
  return (
      <div>
      <GameShell devMode = {props.devMode} playersTurn = {props.playersTurn} setPlayersTurn = {props.setPlayersTurn} foe = {foe} setFoe = { setFoe }/>
      </div>
  )
}