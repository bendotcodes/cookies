<h3 align="center">
  universal-cookie-koa
</h3>

<p align="center">
  Hook cookies get/set on Koa for server-rendering<br />
  <a href="https://badge.fury.io/js/universal-cookie-koa"><img src="https://badge.fury.io/js/universal-cookie-koa.svg" /></a>
</p>

[![Build Status](https://travis-ci.org/reactivestack/cookies.svg?branch=master)](https://travis-ci.org/reactivestack/cookies)
<br />
[![Sauce Test Status](https://saucelabs.com/browser-matrix/coookies.svg)](https://saucelabs.com/u/coookies)

## Integrations
**State management integration**
 - [`universal-cookie`](https://www.npmjs.com/package/universal-cookie) - Universal cookies for JavaScript
 - [`react-cookie`](https://www.npmjs.com/package/react-cookie) - Universal cookies for React

## Getting started

`npm install universal-cookie-koa --save`

## Usage
`cookiesMiddleware()` koa middleware set `req.universalCookies`

## Example

```js
const Koa = require('koa');
const cookiesMiddleware = require('universal-cookie-koa');

const app = new Koa();

app
  .use(cookiesMiddleware())
  .use(function(ctx) {
    // get the user cookies using universal-cookie
    ctx.request.universalCookies.get('myCat')
  });
```
