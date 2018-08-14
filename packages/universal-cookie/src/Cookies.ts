import * as cookie from 'cookie';
import * as objectAssign from 'object-assign';

import { parseCookies, readCookie, hasDocumentCookie } from './utils';
import { 
  Cookie, 
  CookieGetOptions, 
  CookieSetOptions, 
  CookieChangeListener, 
  CookieChangeOptions 
} from './types';

export default class Cookies {
  cookies: { [name: string]: Cookie };
  changeListeners: CookieChangeListener[] = [];

  HAS_DOCUMENT_COOKIE: boolean;

  constructor(cookies?: string | object | null) {
    this.cookies = parseCookies(cookies);
    this.HAS_DOCUMENT_COOKIE = hasDocumentCookie();
  }

  _updateBrowserValues() {
    if (!this.HAS_DOCUMENT_COOKIE) {
      return;
    }

    this.cookies = cookie.parse(document.cookie);
  }

  get(name: string, options: CookieGetOptions = {}) {
    this._updateBrowserValues();
    return readCookie(this.cookies[name], options);
  }

  getAll(options: CookieGetOptions = {}) {
    this._updateBrowserValues();
    const result: { [name: string]: any } = {};

    for (let name in this.cookies) {
      result[name] = readCookie(this.cookies[name], options);
    }

    return result;
  }

  set(name: string, value: Cookie, options?: CookieSetOptions) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    this.cookies = objectAssign({}, this.cookies, { [name]: value });

    if (this.HAS_DOCUMENT_COOKIE) {
      document.cookie = cookie.serialize(name, value, options);
    }

    this._emitChange({ name, value, options });
  }

  remove(name: string, options?: CookieSetOptions) {
    const finalOptions = (options = objectAssign({}, options, {
      expires: new Date(1970, 1, 1, 0, 0, 1),
      maxAge: 0
    }));

    this.cookies = objectAssign({}, this.cookies);
    delete this.cookies[name];

    if (this.HAS_DOCUMENT_COOKIE) {
      document.cookie = cookie.serialize(name, '', finalOptions);
    }

    this._emitChange({ name, value: undefined, options });
  }

  _emitChange(params: CookieChangeOptions) {
    for (let i = 0; i < this.changeListeners.length; ++i) {
      this.changeListeners[i](params);
    }
  }

  addChangeListener(callback: CookieChangeListener) {
    this.changeListeners.push(callback);
  }

  removeChangeListener(callback: CookieChangeListener) {
    const idx = this.changeListeners.indexOf(callback);
    if (idx >= 0) {
      this.changeListeners.splice(idx, 1);
    }
  }
}
