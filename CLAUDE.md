# Development Guidelines

## Build Commands

- Build all packages: `yarn build`
- Build specific package: `yarn build-universal`, `yarn build-react`, etc.
- Test all: `yarn test`
- Run single test: `jest packages/react-cookie/src/__tests__/my-test.js`
- Test with watch mode: `yarn watch`
- Run E2E tests: `yarn e2e`
- Format check: `yarn format`
- Code size analysis: `yarn size`

## Code Style Guidelines

- TypeScript project with strict typing and React functional components
- Use single quotes for strings
- Explicit error handling with descriptive messages
- Private methods/properties prefixed with underscore (\_)
- Group related imports together
- Prefer destructuring for props and imports
- camelCase for variables/functions, PascalCase for components
- Type interfaces for function parameters and return types
- Use object spread (...) for merging options
- Comprehensive test coverage required for all new features
