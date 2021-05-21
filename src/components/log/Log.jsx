import './index.css'
import React from 'react'

/* The purpose of the Log component is to render the log messages 
  (the action history of the robot) by the time the robot was placed on the board.
  Invalid actions are marked with red color */
function Log({ log = [] }) {
  return (
    <div className="log box">
      <div className="log-label">
        Action Log
      </div>
      <div className="log-panel">
        {log.map(({ error, message }, index) => (
          <p
            className={'log-item' + (error ? ' danger' : '')}
            key={index}
            data-testid={index}>
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Log;