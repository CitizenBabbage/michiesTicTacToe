import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { menaceBlurb1 } from "../blurbs/menaceBlurb1.js";
import { menaceBlurb2 } from "../blurbs/menaceBlurb2.js";

import menacePortrait from '../images/chosen/menace.png'


export default function Menace( props ) {
  const trainingSound = '../soundFX/menaceLoss2.mp3'
  const [foe, setFoe] = useState("menace")
  const thinkBoardText = "How MENACE decided its previous turn. The more beads in the square, the more likely that move." 

  return (
      <div>
        <GameShell thinkBoardText = {thinkBoardText} trainingSound = {trainingSound} preblurb = {menaceBlurb1} playStyle = "Brute Memorization" name = "Menace" blurb = {menaceBlurb2} src = {menacePortrait} devMode = {props.devMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} setFoe = { setFoe }/>
      </div>
  )
}

