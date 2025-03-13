import React from 'react';
import { useCookies } from 'react-cookie';
import { CookieValues } from '../types';
import NameForm from './NameForm';

export default function App(): React.ReactElement {
  const [cookies, setCookie, removeCookie] = useCookies<'name', CookieValues>([
    'name',
  ]);

  function onChange(newName: string): void {
    setCookie('name', newName, { path: '/' });
  }

  function onExternalCall(): void {
    document.cookie = 'name=Meow; path=/';
  }

  function onClear(): void {
    removeCookie('name');
  }

  return (
    <div>
      <NameForm name={cookies.name || ''} onChange={onChange} />
      <button type="button" onClick={onClear}>
        Clear
      </button>
      <button type="button" onClick={onExternalCall}>
        External Call
      </button>
      {cookies.name && <h1>Hello {cookies.name}!</h1>}
    </div>
  );
}
