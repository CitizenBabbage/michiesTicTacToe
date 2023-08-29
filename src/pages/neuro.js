import GameShell from "../components/gameEngine/GameShell.js"
import React, { useState } from 'react';
import { IdFacts } from "../components/presentational/IdFacts.js";

import neuroPortrait from '../images/neuro/7cd6bd08398c4f948061c6e50555f7da5c4145b4.webp'
import {neuroBlurb} from '../blurbs/neuroBlurb.js'



export default function Neuro( props ) {

  const [foe, setFoe] = useState("Neuro")
  return (
      <div className = 'page'>
        <h1>UNDER DEVELOPMENT</h1> 
        <IdFacts name = "Neuro" blurb = {neuroBlurb} src = {neuroPortrait}/> 
      </div>
  )
}
