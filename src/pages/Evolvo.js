import GameShell from "../components/GameShell.js"
import React, { useState } from 'react';
import { evolvoBlurb } from "../blurbs/evolvoBlurb.js";

import { IdFacts } from "../components/IdFacts.js";
import evolvoPortrait from '../images/evolvo4.webp'


export default function Huris( props ) {

  const [foe, setFoe] = useState("evolvo")
  return (
      <div className = 'page'>
      <GameShell devMode = {props.devMode} playersTurn = {props.playersTurn} setPlayersTurn = {props.setPlayersTurn} foe = {foe} setFoe = { setFoe }/>
      <IdFacts name = "Evolvo" blurb = {evolvoBlurb} src = {evolvoPortrait}/> 
      </div>
  )
}