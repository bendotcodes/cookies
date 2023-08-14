# CHANGELOG

# This file is no more maintained

To see changelogs, please look at the release notes instead in GitHub.

## vNEXT

- `react-cookie`: Fix withCookies bug with CommonJS (#293)
- `react-cookie`: Fix useLayoutEffect warning on SSR (#295)

## v4.1.0

- `react-cookie`: Switch to useLayoutEffect to load cookies before first render
- `react-cookie`: Improved TypeScript types on useCookies
- `react-cookie`: Fix using with ESModule
- `universal-cookie-koa`: Fix the maxAge incongruency between the standard (seconds) and koa (ms)

## v4.0.4

- `universal-cookie`: Remove only usage of CommonJS require

## v4.0.3

- All: improved tree shaking by adding `"sideEffects": false`
- `universal-cookie`: JSDOM is now using the real browser cookies
- `universal-cookie`: You can specify your cookie parsing function

## v4.0.2

- `universal-cookie`: Add support for explicit `None` value on `sameSite` attribute

## v4.0.1

- Upgrade dependencies to last versions
- Publish MIT license to NPM with the code (#224)
- `universal-cookie`: Add support for generic type with reading cookies (#222)
- `universal-cookie`: Disable accessing browser cookies on JSDOM (#227)
- `react-cookie`: Add `WrappedComponent` static property when using `withCookies` (#225)
- `react-cookie`: Fix display name to include the original component name

## v4.0.0

- `universal-cookie`: Remove useless testing variable
- `react-cookie`: Memoize setCookie/removeCookie so that it doesn't change unnecessarily
- `react-cookie`: Go back to withCookies orignial type

## v3.1.1

- `react-cookie`: Fix documentation

## v3.1.0

- `react-cookie`: Add useCookies to support React hooks

## v3.0.8

- `react-cookie`: Revert breaking change on withCookies typing

## v3.0.7

- `react-cookie`: Fix wrong typing on CookiesProvider
- `react-cookie`: Fix memory leak on server-side rendering

## v3.0.6

- Fix the build (was missing important files)

## v3.0.5

- `universal-cookie`: Trim j: prefix so we can deserialize cookies serialized by express
- `react-cookie`: Fix TypeScript types

## v3.0.4

- `react-cookie`: Fix `withCookies` to no require props on the wrapped component
- `universal-cookie`: Add missing cookie property `sameSite` to typing

## v3.0.3

- Fix default exports for CommonJS (no more `.default` required)

## v3.0.2

- `react-cookie`: Improve README with minimum requirements

## v3.0.1

- Added CommonJS build, UMD build and ES6 build

## v3.0.0

- `react-cookie`: Requires `react >= 16.3.0` because of the new context API and forwarded ref. Use `v2.2.0` otherwise
- `universal-cookie`: Removed undocumented hooks on `Cookie` constructor

## v2.2.0

- Last stable version supporting `react < 16.3.0`
