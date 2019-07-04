# CHANGELOG

##vNEXT

- Upgrade dependencies to last versions
- Publish MIT license to NPM with the code (#224)
- `universal-cookie`: Add support for generic type with reading cookies (#222)
- `react-cookie`: Add `WrappedComponent` static property when using `withRouter` (#225)

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
