import * as cookie from 'cookie';

import { parseCookies, readCookie, hasDocumentCookie } from './utils';
import {
  Cookie,
  CookieGetOptions,
  CookieSetOptions,
  CookieChangeListener,
  CookieChangeOptions
} from './types';

// We can't please Rollup and TypeScript at the same time
// Only way to make both of them work
const objectAssign = require('object-assign');

export default class Cookies {
  private cookies: { [name: string]: Cookie };
  private changeListeners: CookieChangeListener[] = [];

  private HAS_DOCUMENT_COOKIE: boolean;
  public TESTING_ONETWO = 2;

  constructor(cookies?: string | object | null) {
    this.cookies = parseCookies(cookies);
    this.HAS_DOCUMENT_COOKIE = hasDocumentCookie();
  }

  private _updateBrowserValues() {
    if (!this.HAS_DOCUMENT_COOKIE) {
      return;
    }

    this.cookies = cookie.parse(document.cookie);
  }

  private _emitChange(params: CookieChangeOptions) {
    for (let i = 0; i < this.changeListeners.length; ++i) {
      this.changeListeners[i](params);
    }
  }

  public get(name: string, options: CookieGetOptions = {}) {
    this._updateBrowserValues();
    return readCookie(this.cookies[name], options);
  }

  public getAll(options: CookieGetOptions = {}) {
    this._updateBrowserValues();
    const result: { [name: string]: any } = {};

    for (let name in this.cookies) {
      result[name] = readCookie(this.cookies[name], options);
    }

    return result;
  }

  public set(name: string, value: Cookie, options?: CookieSetOptions) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    this.cookies = objectAssign({}, this.cookies, { [name]: value });

    if (this.HAS_DOCUMENT_COOKIE) {
      document.cookie = cookie.serialize(name, value, options);
    }

    this._emitChange({ name, value, options });
  }

  public remove(name: string, options?: CookieSetOptions) {
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

  public addChangeListener(callback: CookieChangeListener) {
    this.changeListeners.push(callback);
  }

  public removeChangeListener(callback: CookieChangeListener) {
    const idx = this.changeListeners.indexOf(callback);
    if (idx >= 0) {
      this.changeListeners.splice(idx, 1);
    }
  }
}
