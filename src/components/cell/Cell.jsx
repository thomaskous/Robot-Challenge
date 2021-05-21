import './index.css'
import React from 'react'

/* The Cell. Each cell has an id attribute which designates its position 
   on our 5x5 kartesian system */
function Cell({ children, ...restProps }) {
  return (
    <div className="cell" {...restProps}>
      {children}
    </div>
  );
}


export default Cell;