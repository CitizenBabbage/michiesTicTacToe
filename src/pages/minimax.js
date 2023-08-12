import GameShell from "../components/GameShell.js"
import React, { useState } from 'react';



export default function Minimax( props ) {
    // const dbs = props.dbs, setDBS = props.setDBS; 

    // useEffect(() => {
    //     setDBS(prevValue => prevValue + 1);
    // }, []); 
    // console.log("minimax, debugging sequencer: ", dbs)

  const [foe, setFoe] = useState("minimax")
  return (
      <div>
      <GameShell devMode = {props.devMode} foe = {foe} setFoe = { setFoe } />
      </div>
  )
}
