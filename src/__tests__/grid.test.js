import React from 'react'
import { render } from '@testing-library/react'
import Grid from '../components/grid/Grid'
import { RobotContext } from '../context/robotContext';

describe('<Grid />', () => {
  it('renders an 3x3 <Grid /> with no robot', () => {
    const { container, getAllByTestId, queryByAltText } = render(
      <RobotContext.Provider value={{ position: { x: null, y: null }, facing: '' }}>
        <Grid rows={3} columns={3} />
      </RobotContext.Provider>
    )

    expect(getAllByTestId('cell').length).toEqual(9);
    expect(queryByAltText('robot')).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders an 3x3 <Grid /> with a robot', () => {
    const { container, getAllByTestId, getByAltText } = render(
      <RobotContext.Provider value={{ position: { x: 1, y: 1 }, facing: 'N' }}>
        <Grid rows={3} columns={3} />
      </RobotContext.Provider>
    )

    expect(getAllByTestId('cell').length).toEqual(9);
    expect(getByAltText('robot')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});