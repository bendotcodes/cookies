# react-cookie
Load and save cookies within your React application

## Download
NPM: `npm install react-cookie`<br />
Bower: `bower install react-cookie`

# Examples

## ES6
```js
import React from 'react';
import cookie from 'react-cookie';

export default class MyApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { userId: cookie.load('userId') };
  }

  onLogin(userId) {
    this.state.userId = userId;
    cookie.save('userId', userId);
  }

  render() {
    return (
      <LoginPanel onSuccess={this.onLogin.bind(this)} />
    );
  }

}
```

## ES5
```js
var React = require('react');
var cookie = require('react-cookie');

var MyApp = React.createClass({

  getInitialState: function() {
    return { userId: cookie.load('userId') };
  },

  onLogin: function(userId) {
    this.state.userId = userId;
    cookie.save('userId', userId);
  },

  render: function() {
    return (
      <LoginPanel onSuccess={this.onLogin} />
    );
  }

});

module.exports = MyApp;
```

## Without CommonJS
You can use react-cookie with anything by using the global variable `reactCookie`.

*Note that `window` need to exists to use `reactCookie`.*

## Usage

### `reactCookie.load(name)`
### `reactCookie.save(name, val, [opt])`

## opt
Support all the cookie options from the RFC.

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