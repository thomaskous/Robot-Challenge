import './index.css'
import React, { useContext } from 'react'
import Cell from '../cell/Cell'
import Robot from '../robot/robot';
import { RobotContext } from '../../context/robotContext'

/* The Grid Component renders the cells as a 5x5 raster 
   and passes the Robot to the "active" cell. To do that it 
   has to consume the position and the facing from the RobotContext*/
function Grid({ rows, columns }) {
  const { position, facing } = useContext(RobotContext);

  const cells = [];
  let cellId = null;

  if (null !== position.x && null !== position.y && facing) {
    cellId = position.y + '' + position.x;
  }

  // use a for loop to create rows
  for (let i = rows; i > 0; i--) {
    // use a nested loop to create columns inside the rows
    for (let y = 0; y < columns; y++) {
      cells.push(
        <Cell key={i + '/' + y} id={`${y}${i - 1}`} data-testid='cell'>
          {(cellId === `${i - 1}${y}`) && <Robot facing={facing} />}
        </Cell>
      );
    }
  }

  return (
    <div className="grid">
      {cells}
    </div>
  )
}

export default Grid;