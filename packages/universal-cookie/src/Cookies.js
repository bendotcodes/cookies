import cookie from 'cookie';
import objectAssign from 'object-assign';
import { isNode } from './utils';

export default class Cookies {
  constructor(cookies, hooks) {
    if (isNode()) {
      if (typeof cookies === 'string') {
        this.cookies = cookie.parse(cookies);
      } else if (typeof cookies === 'object') {
        this.cookies = cookies;
      } else {
        throw new Error('Missing the cookie header or object');
      }
    } else if (cookies) {
      throw new Error('The browser should not provide the cookies');
    }

    this.hooks = hooks;
  }

  get(name, options = {}) {
    const values = this.cookies || cookie.parse(document.cookie);
    return readCookie(values[name], options);
  }

  getAll(options = {}) {
    const values = this.cookies || cookie.parse(document.cookie);
    const result = {};

    for (let name in values) {
      result[name] = readCookie(values[name], options);
    }

    return result;
  }

  set(name, value, options) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    if (this.hooks && this.hooks.onSet) {
      this.hooks.onSet(name, value, options);
    }

    if (isNode()) {
      this.cookies[name] = value;
    } else {
      document.cookie = cookie.serialize(name, value, options);
    }
  }

  remove(name, options) {
    const finalOptions = (options = objectAssign({}, options, {
      expires: new Date(1970, 1, 1, 0, 0, 1),
      maxAge: 0
    }));

    if (this.hooks && this.hooks.onRemove) {
      this.hooks.onRemove(name, finalOptions);
    }

    if (isNode()) {
      delete this.cookies[name];
    } else {
      document.cookie = cookie.serialize(name, '', finalOptions);
    }
  }
}

function isParsingCookie(value, doNotParse) {
  if (typeof doNotParse === 'undefined') {
    // We guess if the cookie start with { or [, it has been serialized
    doNotParse = !value || (value[0] !== '{' && value[0] !== '[') && value[0] !== '"';
  }

  return !doNotParse;
}

function readCookie(value, options) {
  if (isParsingCookie(value, options.doNotParse)) {
    try {
      return JSON.parse(value);
    } catch (e) {
      // At least we tried
    }
  }

  return value;
}
