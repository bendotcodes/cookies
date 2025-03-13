import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CookiesProvider } from 'react-cookie';
import { Request, Response } from 'express';

import Html from './components/Html';
import App from './components/App';
import { AppRequest } from './types';

export default function middleware(req: Request, res: Response): void {
  const markup = ReactDOMServer.renderToString(
    <CookiesProvider cookies={(req as unknown as AppRequest).universalCookies}>
      <App />
    </CookiesProvider>,
  );

  const html = ReactDOMServer.renderToStaticMarkup(<Html markup={markup} />);

  res.send('<!DOCTYPE html>' + html);
}
