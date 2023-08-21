import React from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';

import App from './components/App';

const appEl = document.getElementById('main-app');
const node = createRoot(appEl);

node.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
);
