import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import hurisPortrait from '../images/chosen/huris2.gif'
import { hurisBlurb1 } from "../blurbs/hurisBlurb1.js";

import { hurisBlurb2 } from "../blurbs/hurisBlurb2.js";
import { IdFacts } from "../components/presentational/IdFacts.js";



export default function Huris( props ) {

  const [foe, setFoe] = useState("huris")
  return (
      <div >
      <GameShell name = "Huris" playStyle = "Rule Follower" preblurb = {hurisBlurb1} blurb = {hurisBlurb2} src = {hurisPortrait} devMode = {props.devMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} setFoe = { setFoe }/>
      </div>
  )
}