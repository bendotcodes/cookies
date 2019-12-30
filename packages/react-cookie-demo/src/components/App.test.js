import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from './App';
import { Cookies } from 'react-cookie';

afterEach(cleanup);

test('Changing the name change the cookie value', () => {
  const cookies = new Cookies();
  const utils = render(<App />);
  const input = utils.getByPlaceholderText('Enter your name');
  fireEvent.change(input, { target: { value: 'Ben Solo' } });
  expect(input.value).toBe('Ben Solo');
  expect(cookies.get('name')).toBe('Ben Solo');
});
