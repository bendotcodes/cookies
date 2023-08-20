import * as cookie from 'cookie';
import {
  Cookie,
  CookieChangeListener,
  CookieChangeOptions,
  CookieGetOptions,
  CookieSetOptions,
} from './types';
import { hasDocumentCookie, parseCookies, readCookie } from './utils';

export default class Cookies {
  private cookies: { [name: string]: Cookie };
  private defaultSetOptions: CookieSetOptions;
  private changeListeners: CookieChangeListener[] = [];

  private HAS_DOCUMENT_COOKIE: boolean = false;

  constructor(
    cookies?: string | object | null,
    defaultSetOptions: CookieSetOptions = {},
  ) {
    this.cookies = parseCookies(cookies);
    this.defaultSetOptions = defaultSetOptions;

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

  public get(name: string, options?: CookieGetOptions): any;
  public get<T>(name: string, options?: CookieGetOptions): T;
  public get(name: string, options: CookieGetOptions = {}) {
    this._updateBrowserValues();
    return readCookie(this.cookies[name], options);
  }

  public getAll(options?: CookieGetOptions): any;
  public getAll<T>(options?: CookieGetOptions): T;
  public getAll(options: CookieGetOptions = {}) {
    this._updateBrowserValues();
    const result: { [name: string]: any } = {};

    for (let name in this.cookies) {
      result[name] = readCookie(this.cookies[name], options);
    }

    return result;
  }

  public set(name: string, value: Cookie, options?: CookieSetOptions) {
    if (options) {
      options = {
        ...this.defaultSetOptions,
        ...options,
      };
    } else {
      options = this.defaultSetOptions;
    }

    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    this.cookies = { ...this.cookies, [name]: value };

    if (this.HAS_DOCUMENT_COOKIE) {
      document.cookie = cookie.serialize(name, stringValue, options);
    }

    this._emitChange({ name, value, options });
  }

  public remove(name: string, options?: CookieSetOptions) {
    const finalOptions = (options = {
      ...options,
      expires: new Date(1970, 1, 1, 0, 0, 1),
      maxAge: 0,
    });

    this.cookies = { ...this.cookies };
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
