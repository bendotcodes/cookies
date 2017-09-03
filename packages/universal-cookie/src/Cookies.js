import cookie from 'cookie';
import objectAssign from 'object-assign';
import { HAS_DOCUMENT_COOKIE } from './utils';

export default class Cookies {
  constructor(cookies, hooks) {
    if (typeof cookies === 'string') {
      this.cookies = cookie.parse(cookies);
    } else if (typeof cookies === 'object') {
      this.cookies = cookies;
    } else {
      this.cookies = {};
    }

    this.hooks = hooks;
  }

  _updateBrowserValues() {
    if (!HAS_DOCUMENT_COOKIE) {
      return;
    }

    const newCookies = cookie.parse(document.cookie);

    // Make sure we keep the other cookies
    // In test, sometimes we have an empty document.cookie
    for (let name in newCookies) {
      this.cookies[name] = newCookies[name];
    }
  }

  get(name, options = {}) {
    this._updateBrowserValues();
    return readCookie(this.cookies[name], options);
  }

  getAll(options = {}) {
    this._updateBrowserValues();
    const result = {};

    for (let name in this.cookies) {
      result[name] = readCookie(this.cookies[name], options);
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

    this.cookies[name] = value;

    if (HAS_DOCUMENT_COOKIE) {
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

    delete this.cookies[name];

    if (HAS_DOCUMENT_COOKIE) {
      document.cookie = cookie.serialize(name, '', finalOptions);
    }
  }
}

function isParsingCookie(value, doNotParse) {
  if (typeof doNotParse === 'undefined') {
    // We guess if the cookie start with { or [, it has been serialized
    doNotParse =
      !value || (value[0] !== '{' && value[0] !== '[' && value[0] !== '"');
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
