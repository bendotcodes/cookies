var cookie = require('cookie');

var _rawCookie = {};

function load(name, doNotParse) {
  var cookies = cookie.parse(rawCookie);
  var cookie = cookies[name] || _rawCookie[name];

  if (!doNotParse) {
    try {
      cookie = JSON.parse(cookie);
    } catch(e) {
      // Not serialized object
    }
  }

  return cookie;
}

function save(name, val, opt) {
  _rawCookie[name] = val;

  // allow you to work with cookies as objects.
  if (typeof val === 'object') {
    _rawCookie[name] = JSON.stringify(val);
  }

  // Cookies only work in the browser
  if (typeof document !== 'undefined') {
    document.cookie = cookie.serialize(name, _rawCookies[name], opt);
  }
}

function remove(name, path) {
  delete _rawCookie[name];

  if (typeof document !== 'undefined') {
    var removeCookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    if (path) {
      removeCookie += ' path=' + path;
    }

    document.cookie = removeCookie;
  }
}

function setRawCookie(rawCookie) {
  _rawCookie = cookie.parse(rawCookie);
}

var reactCookie = {
  load: load,
  save: save,
  remove: remove,
  setRawCookie: setRawCookie
};

if (typeof window !== 'undefined') {
  window['reactCookie'] = reactCookie;
}

module.exports = reactCookie;
