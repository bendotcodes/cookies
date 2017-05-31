// Are we in the browser or node.js?
// Only reliable way to know is checking if we can access the browser cookies
const IS_NODE = typeof document === 'undefined' ||
  typeof document.cookie === 'undefined';

export function isNode() {
  return process.env.NODE_ENV === 'test' &&
    typeof global.MOCK_IS_NODE !== 'undefined'
    ? global.MOCK_IS_NODE
    : IS_NODE;
}

export function cleanCookies() {
  document.cookie.split(';').forEach(function(c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
}
