import GameShell from "../components/GameShell.js"
import React, { useEffect, useState } from 'react';



export default function Menace() {
  const [foe, setFoe] = useState("menace")
  return (
      <div>
      <GameShell foe = {foe}/>
      </div>
  )
}

