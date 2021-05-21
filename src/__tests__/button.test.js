import React from 'react'
import { render } from '@testing-library/react'
import Button from '../components/button/Button'

describe('<Button />', () => {
  it('renders an active <Button />', () => {
    const { container, getByRole } = render(
      <Button
        label="Place"
        classes="input-group"
        clickHandler={() => { }} />
    );

    expect(getByRole('button').disabled).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  })

  it('renders a disabled <Button />', () => {
    const { container, getByRole } = render(
      <Button
        label="Place"
        classes="input-group"
        active={false}
        clickHandler={() => { }} />
    );

    expect(getByRole('button').disabled).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  })
});