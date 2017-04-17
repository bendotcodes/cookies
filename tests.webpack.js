var context = require.context(
  './packages/universal-cookie/src',
  true,
  /-test\.js$/
);
context.keys().forEach(context);

context = require.context('./packages/react-cookie/src', true, /-test\.js$/);
context.keys().forEach(context);
