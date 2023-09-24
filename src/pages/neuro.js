import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { IdFacts } from "../components/presentational/IdFacts.js";

import neuroPortrait from '../images/neuro/gingerNeuro.gif'
import {neuroBlurb} from '../blurbs/neuroBlurb.js'



export default function Neuro( props ) {

  const [foe, setFoe] = useState("Neuro")
  return (
      <div>
        <GameShell name = "Neuro" playStyle = "Connectionist" blurb = {neuroBlurb} src = {neuroPortrait} devMode = {props.devMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} setFoe = { setFoe }/>
      </div>
  )
}
