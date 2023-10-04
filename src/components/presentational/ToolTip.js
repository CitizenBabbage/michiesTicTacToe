import React, { useState, useEffect } from 'react';


export function Tooltip( props ) {
    const text = props.text; 
    return (
        <div className="tooltip-container">
        Hover over me!
        <div className="tooltip-text">I am the tooltip text!</div>
        </div>
    );
    
      
    //   export default TooltipComponent;
    // const [visible, setVisible] = React.useState(false);
    // const text = props.text; 

    // return (
    //     <div className="tooltip-text">I am the tooltip text!</div>
    // )

    // return (
    //   <div className="tooltip-text"
    //     onMouseEnter={() => setVisible(true)}
    //     onMouseLeave={() => setVisible(false)}
    //     style={{ position: 'relative', display: 'inline-block' }}
    //   >
    //     {visible && (
    //       <div className = 'toolTip'>

    //         {text}
    //       </div>
    //     )}
    //   </div>
    // );
  }