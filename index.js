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