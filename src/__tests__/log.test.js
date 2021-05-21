import React from 'react'
import { render } from '@testing-library/react'
import Log from '../components/log/Log'

describe('<Log />', () => {
  it('renders <Log /> with populated data', () => {
    const logs = [
      { error: false, message: 'placing robot on cell X: 0, Y: 0, NORTH' },
      { error: false, message: 'robot rotated right' }
    ];
    const { container, getByText, getByTestId } = render(
      <Log log={logs} />
    );

    expect(getByText('Action Log')).toBeTruthy();
    expect(getByTestId('0')).toBeTruthy();
    expect(getByText('robot rotated right')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});