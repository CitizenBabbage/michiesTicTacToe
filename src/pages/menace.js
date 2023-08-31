import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { menaceBlurb } from "../blurbs/menaceBlurb.js";

import menacePortrait from '../images/menace/77fa83d664df40fb96fe7fb183d4004a02d73734.webp'


export default function Menace( props ) {

  const [foe, setFoe] = useState("menace")
  return (
      <div>
        <GameShell name = "Menace" blurb = {menaceBlurb} src = {menacePortrait} devMode = {props.devMode} playersTurn = {props.playersTurn} setPlayersTurn = {props.setPlayersTurn} foe = {foe} setFoe = { setFoe }/>
      </div>
  )
}

