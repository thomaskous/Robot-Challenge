import { useContext, useState } from 'react'
import { RobotContext } from '../context/robotContext'

/*the useRobot hook holds all the commands logic and the initial place validation. 
  it accepts two arguements a setLog to pass the actions to the Log component 
  and a setPlaceInput to reset the input field in the Controls panel. it consumes
  the RobotContext */
function useRobot(setLog, setPlaceInput) {
  const { position, setPosition, facing, setFacing } = useContext(RobotContext);
  const [validPlace, setValidPlace] = useState(false);

  // the accepted facing values
  const faces = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

  // corresponds to the place() command and is responsible to validate the input
  const placeHandler = (placeInput) => {
    //reset position and facing 
    setPosition({ x: null, y: null });
    setFacing('');

    const input = placeInput.split(',');

    //place should validate the input and log accordingly
    //if input has more than three values, validation should fail
    if (input.length !== 3) {
      setLog(prevLog => [...prevLog, { error: true, message: 'invalid input' }]);
      setValidPlace(false);
      setPlaceInput('');
      return;
    }

    let valid = true;

    for (let i = 0; i < input.length; i++) {
      /* the first two values of the input are the coordinates, check whether their values is in the accepted value range */
      if (i < 2) {
        if (![0, 1, 2, 3, 4].includes(parseInt(input[i]))) {
          valid = false;
          break;
        }
      }

      if (i === 2) {
        /* the third value should hold the facing, validate and its type and the accepted values */
        input[i] = input[i].trim().toUpperCase();
        if (typeof input[i] !== 'string' ||
          !faces.includes(input[i])) {
          valid = false;
          break;
        }
      }
    }

    if (!valid) {
      setLog(prevLog => [...prevLog, { error: true, message: 'invalid input' }]);
      setValidPlace(false);
      setPlaceInput('');
      return;
    }

    const [x, y, facing] = input;

    // set position and facing
    setPosition({ x: parseInt(x), y: parseInt(y) });
    setFacing(facing);

    //log action successful placing action
    setLog([{
      error: false,
      message: `placing robot on cell X: ${x}, Y: ${y}`
    }]);

    //activate action buttons
    setValidPlace(true);
  }

  /* corresponds to the move() command. validates the position to move and forbids 
     moves that will cause the robot to fall from the board */
  const moveHandler = () => {
    const newPosition = { ...position };
    let invalidMove = false;

    switch (facing) {
      case 'NORTH':
        if (position.y === 4) {
          invalidMove = true;
          break;
        }
        newPosition.y++;
        break;
      case 'SOUTH':
        if (position.y === 0) {
          invalidMove = true;
          break;
        }
        newPosition.y--;
        break;
      case 'EAST':
        if (position.x === 4) {
          invalidMove = true;
          break;
        }
        newPosition.x++;
        break;
      case 'WEST':
        if (position.x === 0) {
          invalidMove = true;
          break;
        }
        newPosition.x--;
        break;
      default:
    }

    if (invalidMove) {
      setLog(prevLog => [...prevLog, { error: true, message: 'move not valid please try to rotate the robot' }]);
      return;
    }

    setLog(prevLog => [...prevLog, { error: false, message: 'robot moved one slot forward' }]);

    setPosition(newPosition);
  }

  // corresponds to the left() command. rotates the robot 90degrees anticlockwise
  const rotateLeftHandler = () => {
    setLog(prevLog => [...prevLog, { error: false, message: 'robot rotated left' }]);

    let faceIndex = faces.indexOf(facing);
    if (faceIndex !== 0) {
      setFacing(faces[--faceIndex]);
      return;
    }

    setFacing(faces[faces.length - 1]);
  }

  // corresponds to the right() command. rotates the robot 90degrees clockwise
  const rotateRightHandler = () => {
    setLog(prevLog => [...prevLog, { error: false, message: 'robot rotated right' }]);

    let faceIndex = faces.indexOf(facing);
    if (faceIndex !== 3) {
      setFacing(faces[++faceIndex]);
      return;
    }

    setFacing(faces[0]);
  }

  // corresponds to the report() command. outputs the robots current position and facing
  const reportHandler = () => {
    const message = `Ausgabe: ${position.x}, ${position.y}, ${facing}`;
    console.log(message);
    setLog(prevLog => [...prevLog, { error: false, message }]);
  }

  return { placeHandler, moveHandler, rotateLeftHandler, rotateRightHandler, reportHandler, validPlace }
}

export default useRobot;