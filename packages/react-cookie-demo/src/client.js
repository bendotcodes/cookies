import React from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';

import App from './components/App';

const root = createRoot(document.getElementById('main-app'));

root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
);
