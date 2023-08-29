import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import hurisPortrait from '../images/huris/10a7f78f1fd64265a7df0efd71c8c959bc63d032.webp'
import { hurisBlurb } from "../blurbs/hurisBlurb.js";
import { IdFacts } from "../components/presentational/IdFacts.js";



export default function Huris( props ) {

  const [foe, setFoe] = useState("huris")
  return (
      <div className="page">
      <GameShell devMode = {props.devMode} playersTurn = {props.playersTurn} setPlayersTurn = {props.setPlayersTurn} foe = {foe} setFoe = { setFoe }/>
      <IdFacts name = "Huris" blurb = {hurisBlurb} src = {hurisPortrait}/> 

      </div>
  )
}