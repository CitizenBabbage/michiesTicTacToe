import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { IdFacts } from "../components/presentational/IdFacts.js";
import minimaxPortrait from '../images/minimax/minimax4.png'

import {minimaxBlurb} from '../blurbs/minimaxBlurb.js'

export default function Minimax( props ) {


  const [foe, setFoe] = useState("minimax")
  return (
      <div >
      <GameShell name = "Minimax" playStyle = "Space Searcher" blurb = {minimaxBlurb} src = {minimaxPortrait} devMode = {props.devMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} setFoe = { setFoe } />
      </div>
  )
}
