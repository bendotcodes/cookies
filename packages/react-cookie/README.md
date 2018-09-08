<h3 align="center">
  <a href="packages/react-cookie">react-cookie</a>
</h3>

<p align="center">
  Universal cookies for <a href="https://facebook.github.io/react">React</a><br />
  <a href="https://badge.fury.io/js/react-cookie"><img src="https://badge.fury.io/js/react-cookie.svg" /></a>
</p>

[![Build Status](https://travis-ci.org/reactivestack/cookies.svg?branch=master)](https://travis-ci.org/reactivestack/cookies)
<br />
[![Sauce Test Status](https://saucelabs.com/browser-matrix/coookies.svg)](https://saucelabs.com/u/coookies)

## Integrations
 - [`universal-cookie`](https://www.npmjs.com/package/universal-cookie) - Universal cookies for JavaScript
 - [`universal-cookie-express`](https://www.npmjs.com/package/universal-cookie-express) - Hook cookies get/set on Express for server-rendering

## Minimum requirement
### react-cookie @ v3.0+
 - React.js >= 16.3.0 (new context API + forward ref)

### react-cookie @ v0.0-v2.2
 - React.js >= 15

## Getting started

`npm install react-cookie`

or in the browser (global variable `ReactCookie`):

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.js"></script>
<script crossorigin src="https://unpkg.com/universal-cookie@3/umd/universalCookie.min.js"></script>
<script crossorigin src="https://unpkg.com/react-cookie@3/umd/reactCookie.min.js"></script>
```

## `<CookiesProvider />`
Set the user cookies

On the server, the `cookies` props must be set using `req.universalCookies` or `new Cookie(cookieHeader)`

## `withCookies(Component)`
Give access to your cookies anywhere. Add the following props to your component:
 - cookies: Cookies instance allowing you to get, set and remove cookies.
 - allCookies: All your current cookies in an object.

## Cookies

### `get(name, [options])`
Get a cookie value
 - name (string): cookie name
 - options (object):
   - doNotParse (boolean): do not convert the cookie into an object no matter what

### `getAll([options])`
Get all cookies
 - options (object):
   - doNotParse (boolean): do not convert the cookie into an object no matter what

### `set(name, value, [options])`
Set a cookie value
- name (string): cookie name
- value (string|object): save the value and stringify the object if needed
- options (object): Support all the cookie options from RFC 6265
  - path (string): cookie path, use `/` as the path if you want your cookie to be accessible on all pages
  - expires (Date): absolute expiration date for the cookie
  - maxAge (number): relative max age of the cookie from when the client receives it in second
  - domain (string): domain for the cookie (sub.domain.com or .allsubdomains.com)
  - secure (boolean): Is only accessible through HTTPS?
  - httpOnly (boolean): Is only the server can access the cookie?
  - sameSite (boolean|lax|strict): Strict or Lax enforcement

### `remove(name, [options])`
Remove a cookie
- name (string): cookie name
- options (object): Support all the cookie options from RFC 6265
  - path (string): cookie path, use `/` as the path if you want your cookie to be accessible on all pages
  - expires (Date): absolute expiration date for the cookie
  - maxAge (number): relative max age of the cookie from when the client receives it in second
  - domain (string): domain for the cookie (sub.domain.com or .allsubdomains.com)
  - secure (boolean): Is only accessible through HTTPS?
  - httpOnly (boolean): Is only the server can access the cookie?
  - sameSite (boolean|lax|strict): Strict or Lax enforcement

## Simple Example
```js
// Root.jsx
import React from 'react';
import App from './App';
import { CookiesProvider } from 'react-cookie';

export default function Root() {
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
}
```

```js
// App.jsx
import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import NameForm from './NameForm';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      name: cookies.get('name') || 'Ben'
    };
  }

  handleNameChange(name) {
    const { cookies } = this.props;

    cookies.set('name', name, { path: '/' });
    this.setState({ name });
  }

  render() {
    const { name } = this.state;

    return (
      <div>
        <NameForm name={name} onChange={this.handleNameChange.bind(this)} />
        {this.state.name && <h1>Hello {this.state.name}!</h1>}
      </div>
    );
  }
}

export default withCookies(App);
```

## Server-Rendering Example
```js
// src/components/App.js
import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import NameForm from './NameForm';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      name: cookies.get('name') || 'Ben'
    };
  }

  handleNameChange(name) {
    const { cookies } = this.props;

    cookies.set('name', name, { path: '/' });
    this.setState({ name });
  }

  render() {
    const { name } = this.state;

    return (
      <div>
        <NameForm name={name} onChange={this.handleNameChange.bind(this)} />
        {this.state.name && <h1>Hello {this.state.name}!</h1>}
      </div>
    );
  }
}

export default withCookies(App);
```

```js
// src/server.js
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CookiesProvider } from 'react-cookie';

import Html from './components/Html';
import App from './components/App';

export default function middleware(req, res) {
  const markup = ReactDOMServer.renderToString(
    <CookiesProvider cookies={req.universalCookies}>
      <App />
    </CookiesProvider>
  );

  const html = ReactDOMServer.renderToStaticMarkup(<Html markup={markup} />);

  res.send('<!DOCTYPE html>' + html);
}
```

```js
// src/client.js
import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';

import App from './components/App';

const appEl = document.getElementById('main-app');

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  appEl
);
```

```js
// server.js
require('@babel/register');

const express = require('express');
const serverMiddleware = require('./src/server').default;
const cookiesMiddleware = require('universal-cookie-express');

const app = express();

app
  .use('/assets', express.static('dist'))
  .use(cookiesMiddleware())
  .use(serverMiddleware);

app.listen(8080, function() {
  console.log('Listening on 8080...');
});
```
