import cookie from 'cookie';
import objectAssign from 'object-assign';
import { hasDocumentCookie } from './utils';

export default class Cookies {
  changeListeners = [];

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

    this._emitChange({ name, value, options });
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

    this._emitChange({ name, value: undefined, options });
  }

  _emitChange(params) {
    for (let i = 0; i < this.changeListeners.length; ++i) {
      this.changeListeners[i](params);
    }
  }

  addChangeListener(callback) {
    this.changeListeners.push(callback);
  }

  removeChangeListener(callback) {
    const idx = this.changeListeners.indexOf(callback);
    if (idx >= 0) {
      this.changeListeners.splice(idx, 1);
    }
  }
}

function parseCookies(cookies) {
  if (typeof cookies === 'string') {
    return cookie.parse(cookies);
  } else if (typeof cookies === 'object' && cookies !== null) {
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
