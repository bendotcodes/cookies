var cookie = require('cookie');

var _cookies = cookie.parse((typeof document !== 'undefined') ? document.cookie : '');

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
  _cookies[name] = val;

  // Cookies only work in the browser
  if (typeof document === 'undefined') return;

  // allow you to work with cookies as objects.
  // make sure a serialized value returns as serialized again
  if (typeof val === 'object' || typeof val === 'string') val = JSON.stringify(val);

  document.cookie = cookie.serialize(name, val, opt);
}

function remove(name) {
  if (typeof document === 'undefined') return;
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

var reactCookie = {
  load: load,
  save: save,
  remove: remove
};

if (typeof module !== 'undefined') {
  module.exports = reactCookie
}

if (typeof window !== 'undefined') {
  window['reactCookie'] = reactCookie;
}
