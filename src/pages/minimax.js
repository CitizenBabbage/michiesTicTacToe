import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { IdFacts } from "../components/presentational/IdFacts.js";
import minimaxPortrait from '../images/minimax/2c5a7d46e7f04555884426495b8cb09c4d07a752.webp'

import {minimaxBlurb} from '../blurbs/minimaxBlurb.js'

export default function Minimax( props ) {

  const [foe, setFoe] = useState("minimax")
  return (
      <div className="page">
      <GameShell name = "Minimax" blurb = {minimaxBlurb} src = {minimaxPortrait} devMode = {props.devMode} playersTurn = {props.playersTurn} setPlayersTurn = {props.setPlayersTurn} foe = {foe} setFoe = { setFoe } />
      </div>
  )
}
