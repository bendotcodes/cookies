# CLAUDE.md - Guidelines for this repository

## Commands

- Build all packages: `yarn build`
- Run tests: `yarn test`
- Run single test: `yarn test -t "test name pattern"`
- Run e2e tests: `yarn e2e`
- Check formatting: `yarn format`
- Check bundle size: `yarn size`

## Code Style

- TypeScript with strict mode
- Prefer single quotes
- Use semicolons
- Max line length: 80 characters
- React hooks naming: `use{Name}`
- Components: PascalCase, other identifiers: camelCase
- Use explicit return types for exported functions
- Default to `const` over `let`, avoid `var`
- Prefer arrow functions for callbacks

## Project Structure

- Monorepo with packages in `packages/`
- Universal Cookie (core) → React Cookie (UI) → Express/Koa integration
- End-to-end test suite in `e2e/`

## Development Guidelines

- Always cover all scenarios with unit tests
- Prefer to reuse existing code
- Do not change any library or technology without being explicitly asked
- Security is a big concern, be careful with every value you receive

## Error Handling

- Use typed error objects where possible
- Document error cases in comments
- Add tests for error scenarios
