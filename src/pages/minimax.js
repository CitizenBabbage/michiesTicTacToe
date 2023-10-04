import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { IdFacts } from "../components/presentational/IdFacts.js";
import minimaxPortrait from '../images/chosen/minimax.gif'
import {minimaxBlurb1} from '../blurbs/minimaxBlurb1.js'

import {minimaxBlurb2} from '../blurbs/minimaxBlurb2.js'

export default function Minimax( props ) {


  const [foe, setFoe] = useState("minimax")
  const thinkBoardText = "These are the scores Minimax assigned to each possible move on the last turn."

  return (
      <div >
      <GameShell thinkBoardText = {thinkBoardText} name = "Minimax" playStyle = "Space Searcher" preblurb = {minimaxBlurb1} blurb = {minimaxBlurb2} src = {minimaxPortrait} devMode = {props.devMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} setFoe = { setFoe } />
      </div>
  )
}
