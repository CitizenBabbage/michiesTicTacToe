import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { evolvoBlurb } from "../blurbs/evolvoBlurb.js";

import { IdFacts } from "../components/presentational/IdFacts.js";
import evolvoPortrait from '../images/evolvo4.webp'


export default function Huris( props ) {

  const [foe, setFoe] = useState("evolvo")
  return (
      <div >
      <GameShell name = "Evolvo" playStyle = "Darwinian" blurb = {evolvoBlurb} src = {evolvoPortrait} devMode = {props.devMode} playersTurn = {props.playersTurn} setPlayersTurn = {props.setPlayersTurn} foe = {foe} setFoe = { setFoe }/>
      </div>
  )
}