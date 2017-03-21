# react-cookie
[![npm version](https://badge.fury.io/js/react-cookie.svg)](https://badge.fury.io/js/react-cookie)
[![Build Status](https://travis-ci.org/thereactivestack/react-cookie.svg?branch=master)](https://travis-ci.org/thereactivestack/react-cookie)
<br />
Load, save and remove cookies on the browser or Node.js

## Install
`npm install react-cookie --save`

## Isomorphic cookies!
To be able to access user cookies while doing server-rendering, you can use [`plugToRequest`](#user-content-plugtorequestreq-res-unplug) or [`setRawCookie`](#user-content-setrawcookiecookies).

## API
### load(name, [doNotParse])
Load the cookie value.<br />
<br />
Returns `undefined` if the cookie does not exist.<br />
Deserialize any cookie starting with { or [ unless `dotNotParse` is `true`.


### select([regex])
Find all the cookies with a name that match the regex.<br />
<br />
Returns an `object` with the cookie name as the key.

### save(name, val, [[options]](#user-content-options))
Set a cookie

### remove(name, [[options]](#user-content-options))
Remove a cookie

### plugToRequest(req, res): unplug()
Load the user cookies so you can do server-rendering and match the same result.<br />
Also send back to the user the new cookies.<br />
Work with connect or express.js by using the cookieParser middleware first.<br />
Use `const unplug = plugToRequest(req, res)` just before your `renderToString`.<br />
<br />
Returns `unplug()` function so it stops setting cookies on the response.


### setRawCookie(cookies)
Load the user cookies so you can do server-rendering and match the same result.<br />
Use `setRawCookie(headers.cookie)` just before your `renderToString`.<br />
Make sure it is the raw string from the request headers.<br />

## Options
Support all the cookie options from the [RFC 6265](https://tools.ietf.org/html/rfc6265#section-4.1.2.1).

### path
> cookie path<br />
> Use `/` as the path if you want your cookie to be accessible on all pages.

### expires
> absolute expiration date for the cookie **(Date object)**

### maxAge
> relative max age of the cookie from when the client receives it **(seconds)**

### domain
> domain for the cookie<br />
> Use `sub.domain.com` if you want to access the cookie on a specific sub-domain only.<br />
> Use `.yourdomain.com` if you want to access the cookie in all your subdomains.

### secure
> Is only accessible through HTTPS? **true or false**

### httpOnly
> Is only the server can access the cookie? **true or false**

# Example

```js
import { Component } from 'react';
import cookie from 'react-cookie';

import LoginPanel from './LoginPanel';
import Dashboard from './Dashboard';

export default class MyApp extends Component {
  componentWillMount() {
    this.state =  { userId: cookie.load('userId') };
  }

  onLogin(userId) {
    this.setState({ userId });
    cookie.save('userId', userId, { path: '/' });
  }

  onLogout() {
    cookie.remove('userId', { path: '/' });
  }

  render() {
    if (!this.state.userId) {
      return <LoginPanel onSuccess={this.onLogin.bind(this)} />;
    }

    return <Dashboard userId={this.state.userId} />;
  }
}
```

## License
This project is under the MIT license. You are free to do whatever you want with it.
