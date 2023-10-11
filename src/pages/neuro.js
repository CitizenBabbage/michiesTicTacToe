import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { IdFacts } from "../components/presentational/IdFacts.js";

import neuroPortrait from '../images/chosen/neuro3.gif'
import {neuroBlurb1} from '../blurbs/neuroBlurb1.js'

import {neuroBlurb2} from '../blurbs/neuroBlurb2.js'



export default function Neuro( props ) {

  const [foe, setFoe] = useState("Neuro")
  const thinkBoardText = "These are the scores Neuro assigned to each possible move on the last turn"
  const challengeBoardText = "Neuro must score the moves for this board state"
  const neuroPredictionsBoardText = "Neuro tries to predict Minimax's scores. Neuro plays well when its highest scoring move is also Minimax's"
  const neuroMinimaxBoardText = "The correct scores from Minimax"
  return (
      <div>
        <GameShell hourglassActive = {props.hourglassActive} busy = {props.busy} setBusy = {props.setBusy} neuroMinimaxBoardText = {neuroMinimaxBoardText} neuroPredictionsBoardText = {neuroPredictionsBoardText} challengeBoardText = {challengeBoardText} thinkBoardText = {thinkBoardText} name = "Neuro" playStyle = "Connectionist" preblurb = {neuroBlurb1} blurb = {neuroBlurb2} src = {neuroPortrait} devMode = {props.devMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} setFoe = { setFoe }/>
      </div>
  )
}
