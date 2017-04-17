import IS_NODE from 'is-node';

export function isNode() {
  return process.env.NODE_ENV === 'test' &&
    typeof global.MOCK_IS_NODE === 'undefined'
    ? IS_NODE
    : global.MOCK_IS_NODE;
}

export function cleanCookies() {
  document.cookie.split(';').forEach(function(c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
}
