import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { evolvoBlurb2 } from "../blurbs/evolvoBlurb2.js";
import { evolvoBlurb1 } from "../blurbs/evolvoBlurb1.js";

import { IdFacts } from "../components/presentational/IdFacts.js";
import evolvoPortrait from '../images/chosen/evolvoFinal.png'


export default function Huris( props ) {

  const [foe, setFoe] = useState("evolvo")
  return (
      <div >
      <GameShell name = "Evolvo" playStyle = "Darwinian" preblurb = {evolvoBlurb1} blurb = {evolvoBlurb2} src = {evolvoPortrait} devMode = {props.devMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} setFoe = { setFoe }/>
      </div>
  )
}