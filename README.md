# react-cookie
Load, save and remove cookies within your React application

## Isomorphic cookies!
You can also plug it directly with a Node.js request by adding just before the renderToString: `var unplug = reactCookie.plugToRequest(req, res);`<br />
*(require the cookieParser middleware)*

To ensure long running async operations do not attempt to alter cookies after the request has been sent, call the `unplug` function that is returned in a finally block in your router.

If you are within a non-browser or Node.js environment, you can use `reactCookie.setRawCookie(req.headers.cookie)`



## Download
NPM: `npm install react-cookie`<br />
Bower: `bower install react-cookie`<br />
CDN: `https://cdnjs.cloudflare.com/ajax/libs/react-cookie/0.4.3/react-cookie.min.js`

# Examples

```js
import { Component } from 'react';
import cookie from 'react-cookie';

export default class MyApp extends Component {
  constructor(props) {
    super(props);

    this.state =  { userId: cookie.load('userId') };
  }

  onLogin(userId) {
    this.setState({ userId });
    cookie.save('userId', userId, { path: '/' });
  }

  onLogout() {
    cookie.remove('userId', { path: '/' });

    /** Clear all cookies starting with 'session' (to get all cookies, omit regex argument) */
    Object.keys(cookie.select(/^session.*/i)).forEach(name => cookie.remove(name, { path: '/' }))
  }

  render() {
    return (
      <LoginPanel onSuccess={this.onLogin.bind(this)} />
    );
  }
}
```

## Without CommonJS
You can use react-cookie with anything by using the global variable `reactCookie`.

*Note that `window` need to exists to use `reactCookie`.*

## Usage

### `reactCookie.load(name, [doNotParse])`
### `reactCookie.select([regex])`
### `reactCookie.save(name, val, [opt])`
### `reactCookie.remove(name, [opt])`
### `reactCookie.plugToRequest(req, res): unplug()`
### `reactCookie.setRawCookie(cookies)`

## opt
Support all the cookie options from the [RFC 6265](https://tools.ietf.org/html/rfc6265#section-4.1.2.1).

### path
> cookie path

### expires
> absolute expiration date for the cookie (Date object)

### maxAge
> relative max age of the cookie from when the client receives it (seconds)

### domain
> domain for the cookie

### secure
> true or false

### httpOnly
> true or false

## License
This project is under the MIT license. You are free to do whatever you want with it.
