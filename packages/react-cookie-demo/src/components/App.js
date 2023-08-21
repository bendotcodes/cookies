import React from 'react';
import { useCookies } from 'react-cookie';

import NameForm from './NameForm';

function App() {
  const [cookies, setCookie, removeCookie, updateCookies] = useCookies([
    'name',
  ]);

  function onChange(newName) {
    setCookie('name', newName, { path: '/' });
  }

  function onExternalCall() {
    document.cookie = 'name=Meow; path=/';
    updateCookies();
  }

  function onClear() {
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

export default App;
