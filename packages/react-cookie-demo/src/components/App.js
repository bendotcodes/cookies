import React from 'react';
import { useCookies } from 'react-cookie';

import NameForm from './NameForm';

function App() {
  const [cookies, setCookie] = useCookies(['name']);

  function onChange(newName) {
    setCookie('name', newName, { path: '/' });
  }

  return (
    <div>
      <NameForm name={cookies.name} onChange={onChange} />
      {cookies.name && <h1>Hello {cookies.name}!</h1>}
    </div>
  );
}

export default App;
