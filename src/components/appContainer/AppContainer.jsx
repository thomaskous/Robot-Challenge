import React, { useState } from 'react'
import './index.css'
import Playboard from '../playboard/Playboard'
import Log from '../log/Log'
import Controls from '../controls/Controls'

/* This component is the AppContainer. it renders the Playboard and the Log panel,
  it declares the log state and delegates it to the Controls component*/
function AppContainer() {
  const [log, setLog] = useState([]);

  return (
    <div className='app-container'>
      <Playboard>
        <Controls setLog={setLog} />
      </Playboard>
      <Log log={log} />
    </div>
  );
}

export default AppContainer;