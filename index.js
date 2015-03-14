var cookie = require('cookie');

var _cookies = cookie.parse((document && document.cookie) ? document.cookie : '');

for (var key in _cookies) {
  try {
    _cookies[key] = JSON.parse(_cookies[key]);
  } catch(e) {
    // Not serialized object
  }
}

function load(name) {
  return _cookies[name];
}

function save(name, val, opt) {
  // Cookies only work in the browser
  if (!document || !document.cookie) return;

  _cookies[name] = val;
  document.cookie = cookie.serialize(name, val, opt);
}

var reactCookie = {
  load: load,
  save: save
};

if (typeof module !== 'undefined') {
  module.exports = reactCookie
}

if (typeof window !== 'undefined') {
  window['reactCookie'] = reactCookie;
}