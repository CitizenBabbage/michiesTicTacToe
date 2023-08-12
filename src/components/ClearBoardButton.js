import React from 'react';

export default function ClearBoard( props ) { 
    const clearBoard = props.clear; 
    const reset = props.reset; 
    return (
      <div>
      <button className="restart-button" onClick = { () => {clearBoard(); reset()} }>Restart</button>
      </div>
    )
  }