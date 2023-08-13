import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CookiesProvider } from 'react-cookie';

import Html from './components/Html';
import App from './components/App';

export default function middleware(req, res) {
  const markup = ReactDOMServer.renderToString(
    <CookiesProvider cookies={req.universalCookies}>
      <App />
    </CookiesProvider>,
  );

  const html = ReactDOMServer.renderToStaticMarkup(<Html markup={markup} />);

  res.send('<!DOCTYPE html>' + html);
}
