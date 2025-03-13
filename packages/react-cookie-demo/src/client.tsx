import React from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';

import App from './components/App';

const rootElement = document.getElementById('main-app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
);
