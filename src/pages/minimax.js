import GameShell from "../components/GameShell.js"
import React, { useEffect, useState } from 'react';



export default function Minimax() {
  const [foe, setFoe] = useState("minimax")
  return (
      <div>
      <GameShell foe = {foe}/>
      </div>
  )
}
