import './index.css'
import React, { useState } from 'react'
import Button from '../button/Button'
import useRobot from '../../hooks/use-robot'

/* Controls component renders the control fields that fire the robot commands. 
   it uses the useRobot hook to delegate the action logic to the user through
   the buttons. It expects as a prop the setLogs function which passed to the useRobot */
function Controls({ setLog }) {
  const [placeInput, setPlaceInput] = useState('');
  const { placeHandler, moveHandler, rotateLeftHandler, rotateRightHandler, reportHandler, validPlace } = useRobot(setLog, setPlaceInput);


  const placeInputHandler = (e) => {
    setPlaceInput(e.target.value);
  }

  return (
    <div className="controls">
      <div className="input-group">
        <input type="text"
          placeholder="0, 0, NORTH"
          value={placeInput}
          onChange={placeInputHandler} />
        <Button
          label="Place"
          classes="input-group"
          clickHandler={() => placeHandler(placeInput)} />
      </div>
      <div>
        <Button
          label="move"
          active={validPlace}
          clickHandler={moveHandler} />
        <Button
          label="left"
          active={validPlace}
          clickHandler={rotateLeftHandler} />
        <Button
          label="right"
          active={validPlace}
          clickHandler={rotateRightHandler} />
        <Button
          label="report"
          active={validPlace}
          clickHandler={reportHandler} />
      </div>
    </div>
  )
}

export default Controls;