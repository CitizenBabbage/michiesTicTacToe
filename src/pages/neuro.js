import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { IdFacts } from "../components/presentational/IdFacts.js";

import neuroPortrait from '../images/chosen/neuro3.gif'
import {neuroBlurb1} from '../blurbs/neuroBlurb1.js'

import {neuroBlurb2} from '../blurbs/neuroBlurb2.js'



export default function Neuro( props ) {

  const [foe, setFoe] = useState("Neuro")
  const thinkBoardText = "Scores Neuro assigned to each potential move on previous turn"
  const challengeBoardText = "Neuro must score the moves for this board state"
  const neuroPredictionsBoardText = "Neuro's prediction of Minimax's scores."
  const neuroMinimaxBoardText = "The correct scores from Minimax"
  return (
      <div>
        <GameShell busy = {props.busy} setBusy = {props.setBusy} neuroMinimaxBoardText = {neuroMinimaxBoardText} neuroPredictionsBoardText = {neuroPredictionsBoardText} challengeBoardText = {challengeBoardText} thinkBoardText = {thinkBoardText} name = "Neuro" playStyle = "Connectionist" preblurb = {neuroBlurb1} blurb = {neuroBlurb2} src = {neuroPortrait} devMode = {props.devMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} setFoe = { setFoe }/>
      </div>
  )
}
