import './index.css'
import React from 'react'

/* A simple button component with a clickHandler */
function Button({ active = true, classes, clickHandler, label }) {
  return (
    <button
      className={`button ${classes || ''}`}
      onClick={clickHandler}
      disabled={!active}
    >
      {label}
    </button>
  );
}

export default Button;