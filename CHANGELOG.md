# CHANGELOG

## vNEXT

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
