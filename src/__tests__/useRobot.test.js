import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import useRobot from '../hooks/use-robot'
import { RobotContext } from '../context/robotContext'

let position = { x: null, y: null };
let facing = '';

const mockSetPosition = jest.fn().mockImplementation(payload => {
  position = { ...payload }

  return position;
});

const mockSetFacing = jest.fn().mockImplementation(payload => {
  facing = payload;

  return facing;
});

const mockUseContext = {
  position: { x: null, y: null },
  setPosition: mockSetPosition,
  facing: '',
  setFacing: mockSetFacing
};

const RobotContextProvider = ({ children }) => (
  <RobotContext.Provider value={mockUseContext}>{children}</RobotContext.Provider>
);

const wrapper = ({ children }) => (
  <RobotContextProvider>{children}</RobotContextProvider>
);

describe('useRobot', () => {
  it('should place robot on the board', () => {
    const { result } = renderHook(() => useRobot(() => { }, () => { }), { wrapper });

    expect(facing).toBeFalsy();
    expect(result.current.validPlace).toBeFalsy();

    act(() => {
      result.current.placeHandler('0,0,NORTH');
    });
    expect(result.current.validPlace).toBeTruthy();
    expect(mockSetPosition).toHaveBeenCalledWith({ x: 0, y: 0 });
    expect(mockSetFacing).toHaveBeenCalledWith('NORTH');
  });
});