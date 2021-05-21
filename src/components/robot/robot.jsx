import './index.css'
import React from 'react'

/* the Robot components renters a robot image on the grid and is 
  responsible for the image animations */
function Robot({ facing }) {
  return (
    <img className={`robot ${facing[0]}`} src="/robot.png" alt="robot" />
  )
}

export default Robot;