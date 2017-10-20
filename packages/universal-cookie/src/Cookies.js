import cookie from 'cookie';
import objectAssign from 'object-assign';
import { hasDocumentCookie } from './utils';

export default class Cookies {
  constructor(cookies, hooks) {
    this.cookies = parseCookies(cookies);
    this.hooks = hooks;
    this.HAS_DOCUMENT_COOKIE = hasDocumentCookie();
  }

  _updateBrowserValues() {
    if (!this.HAS_DOCUMENT_COOKIE) {
      return;
    }

    this.cookies = cookie.parse(document.cookie);
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

    if (this.HAS_DOCUMENT_COOKIE) {
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

    if (this.HAS_DOCUMENT_COOKIE) {
      document.cookie = cookie.serialize(name, '', finalOptions);
    }
  }
}

function parseCookies(cookies) {
  if (typeof cookies === 'string') {
    return cookie.parse(cookies);
  } else if (typeof cookies === 'object') {
    return cookies;
  } else {
    return {};
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

function readCookie(value, options = {}) {
  if (isParsingCookie(value, options.doNotParse)) {
    try {
      return JSON.parse(value);
    } catch (e) {
      // At least we tried
    }
  }

  return value;
}
