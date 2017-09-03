<h3 align="center">
  universal-cookie-express
</h3>

<p align="center">
  Hook cookies get/set on Express for server-rendering<br />
  <a href="https://badge.fury.io/js/universal-cookie-express"><img src="https://badge.fury.io/js/universal-cookie-express.svg" /></a>
</p>

[![Build Status](https://travis-ci.org/reactivestack/cookies.svg?branch=master)](https://travis-ci.org/reactivestack/cookies)
<br />
[![Sauce Test Status](https://saucelabs.com/browser-matrix/coookies.svg)](https://saucelabs.com/u/coookies)

## Integrations
**State management integration**
 - [`universal-cookie`](https://www.npmjs.com/package/universal-cookie) - Universal cookies for JavaScript
 - [`react-cookie`](https://www.npmjs.com/package/react-cookie) - Universal cookies for React

## Getting started

`npm install universal-cookie-express --save`

## Usage
`cookiesMiddleware()` express middleware set `req.universalCookies`

## Example

```js
const express = require('express');
const cookiesMiddleware = require('universal-cookie-express');

const app = express();

app
  .use(cookiesMiddleware())
  .use(function(req, res) {
    // get the user cookies using universal-cookie
    req.universalCookies.get('myCat')
  });
```
