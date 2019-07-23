export type Cookie = any;

export interface CookieGetOptions {
  doNotParse?: boolean;
}

export interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: boolean | 'none' | 'lax' | 'strict';
}
export interface CookieChangeOptions {
  name: string;
  value?: any;
  options?: CookieSetOptions;
}

export type CookieChangeListener = (options: CookieChangeOptions) => void;
