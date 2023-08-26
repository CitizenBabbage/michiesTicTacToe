import GameShell from "../components/GameShell.js"
import React, { useState } from 'react';
import { IdFacts } from "../components/IdFacts.js";
import {minximaBlurb} from '../blurbs/minximaBlurb.js'
import minximaPortrait from '../images/minxima/af896fd40d0249c88c952f8308485f6888596ec3.webp'



export default function Minxima( props ) {

  const [foe, setFoe] = useState("minxima")
  return (
      <div className="page">
        <h1>UNDER DEVELOPMENT</h1> 
        <IdFacts name = "Minxima" blurb = {minximaBlurb} src = {minximaPortrait}/> 
      </div>
  )
}
