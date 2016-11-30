import cookie from 'cookie';
import objectAssign from 'object-assign';

const IS_NODE = typeof document === 'undefined' || (process && process.env && process.env.NODE_ENV === 'test');
let _rawCookie = {};
let _res = undefined;

function _isResWritable() {
  return _res && !_res.headersSent;
}

export function load(name, doNotParse) {
  const cookies = IS_NODE ? _rawCookie : cookie.parse(document.cookie);
  let cookieVal = cookies && cookies[name];

  if (typeof doNotParse === 'undefined') {
    doNotParse = !cookieVal || (cookieVal[0] !== '{' && cookieVal[0] !== '[');
  }

  if (!doNotParse) {
    try {
      cookieVal = JSON.parse(cookieVal);
    } catch(e) {
      // Not serialized object
    }
  }

  return cookieVal;
}

export function select(regex) {
  const cookies = IS_NODE ? _rawCookie : cookie.parse(document.cookie);

  if (!cookies) {
    return {};
  }

  if (!regex) {
    return cookies;
  }

  return Object.keys(cookies)
    .reduce(function(accumulator, name) {
      if (!regex.test(name)) {
        return accumulator;
      }

      let newCookie = {};
      newCookie[name] = cookies[name];
      return objectAssign({}, accumulator, newCookie);
    }, {});
}

export function save(name, val, opt) {
  _rawCookie[name] = val;

  // allow you to work with cookies as objects.
  if (typeof val === 'object') {
    _rawCookie[name] = JSON.stringify(val);
  }

  // Cookies only work in the browser
  if (!IS_NODE) {
    document.cookie = cookie.serialize(name, _rawCookie[name], opt);
  }

  if (_isResWritable() && _res.cookie) {
    _res.cookie(name, val, opt);
  }
}

export function remove(name, opt) {
  delete _rawCookie[name];

  if (typeof opt === 'undefined') {
    opt = {};
  } else if (typeof opt === 'string') {
    // Will be deprecated in future versions
    opt = { path: opt };
  } else {
    // Prevent mutation of opt below
    opt = objectAssign({}, opt);
  }

  if (typeof document !== 'undefined') {
    opt.expires = new Date(1970, 1, 1, 0, 0, 1);
    opt.maxAge = 0;
    document.cookie = cookie.serialize(name, '', opt);
  }

  if (_isResWritable() && _res.clearCookie) {
    _res.clearCookie(name, opt);
  }
}

export function setRawCookie(rawCookie) {
  if (rawCookie) {
    _rawCookie = cookie.parse(rawCookie);
  } else {
    _rawCookie = {};
  }
}

export function plugToRequest(req, res) {
  if (req.cookie) {
    _rawCookie = req.cookie;
  } else if (req.cookies) {
    _rawCookie = req.cookies;
  } else if (req.headers && req.headers.cookie) {
    setRawCookie(req.headers.cookie);
  } else {
    _rawCookie = {};
  }

  _res = res;

  return function unplug() {
    _res = null;
    _rawCookie = {};
  };
}

export default {
  setRawCookie,
  load,
  select,
  save,
  remove,
  plugToRequest,
};
