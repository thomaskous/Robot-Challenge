import './index.css'
import React, { useState } from 'react'
import Grid from '../grid/Grid'
import { RobotContext } from '../../context/robotContext'

/* Playboard renders the Controls panel and the raster grid. It holds the position and facing state of the application and provides them as context to its children components. */
function Playboard(props) {
  const [position, setPosition] = useState({ x: null, y: null });
  const [facing, setFacing] = useState('');

  return (
    <RobotContext.Provider value={{ position, setPosition, facing, setFacing }}>
      <div className="playboard box">
        {props.children}
        <Grid rows={5} columns={5} />
      </div>
    </RobotContext.Provider>
  )
}

export default Playboard;