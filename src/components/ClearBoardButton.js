import React from 'react';
import { useState, useEffect} from 'react';
// import { useState } from 'react';
// import Square from "./SquareComponent" 

export default function ClearBoard( props ) {
  //   const dbs = props.dbs, setDBS = props.setDBS; 
  //   useEffect(() => {
  //     setDBS(prevValue => prevValue + 1);
  // }, []); 
  //   console.log("ClearBoardButton, debugging sequencer: ", dbs)
    
    const clearBoard = props.clear; 
    const reset = props.reset; 
    return (
      <div>
      <button className="restart-button" onClick = { () => {clearBoard(); reset()} }>Restart</button>
      </div>
    )
  }