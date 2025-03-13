<h3 align="center">
  universal-cookie-koa
</h3>

<p align="center">
  Hook cookies get/set on Koa for server-rendering<br />
  <a href="https://badge.fury.io/js/universal-cookie-koa"><img src="https://badge.fury.io/js/universal-cookie-koa.svg" /></a>
</p>

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
import Koa from 'koa';
import cookiesMiddleware from 'universal-cookie-koa';

const app = new Koa();

app.use(cookiesMiddleware()).use(function (ctx) {
  // get the user cookies using universal-cookie
  ctx.request.universalCookies.get('myCat');
});
```
