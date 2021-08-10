export type Cookie = any;

export interface CookieGetOptions {
  doNotParse?: boolean;
}

export interface CookieSetOptions<V = string> {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'none' | 'lax' | 'strict';
  encode?: (value: V) => string;
}
export interface CookieChangeOptions<V = string> {
  name: string;
  value?: any;
  options?: CookieSetOptions<V>;
}

export interface CookieParseOptions<V = string> {
  decode: (value: string) => V;
}

export interface ParsedCookies<V = string> {
  [key: string]: V | string
}

export type CookieChangeListener<V = string> = (options: CookieChangeOptions<V>) => void;
