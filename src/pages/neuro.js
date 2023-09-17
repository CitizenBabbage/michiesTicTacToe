import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { IdFacts } from "../components/presentational/IdFacts.js";

import neuroPortrait from '../images/neuro/gingerNeuro.gif'
import {neuroBlurb} from '../blurbs/neuroBlurb.js'



export default function Neuro( props ) {

  const [foe, setFoe] = useState("Neuro")
  return (
      <div className = 'page'>
        <GameShell name = "Neuro" blurb = {neuroBlurb} src = {neuroPortrait} devMode = {props.devMode} playersTurn = {props.playersTurn} setPlayersTurn = {props.setPlayersTurn} foe = {foe} setFoe = { setFoe }/>
      </div>
  )
}
