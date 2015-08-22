var cookie = require('cookie');

var _rawCookie = {};
var _res = undefined;

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

  if (_res && _res.cookie) {
    _res.cookie(name, val, opt);
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

  if (_res && _res.clearCookie) {
    var opt = path ? { path: path } : undefined;
    _res.clearCookie(name, opt);
  }
}

function setRawCookie(rawCookie) {
  _rawCookie = cookie.parse(rawCookie);
}

function plugToRequest(req, res) {
  if (req && req.headers && req.headers.cookie) {
    setRawCookie(req.headers.cookie);
  }

  _res = res;
}

var reactCookie = {
  load: load,
  save: save,
  remove: remove,
  setRawCookie: setRawCookie,
  plugToRequest: plugToRequest
};

if (typeof window !== 'undefined') {
  window['reactCookie'] = reactCookie;
}

module.exports = reactCookie;
