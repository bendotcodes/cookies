import * as cookie from 'cookie';
import { Cookie, CookieGetOptions } from './types';

export function hasDocumentCookie() {
  // Can we get/set cookies on document.cookie?
  return typeof document === 'object' && typeof document.cookie === 'string';
}

export function cleanCookies() {
  document.cookie.split(';').forEach(function(c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
}

export function parseCookies(cookies?: string | object | null) {
  if (typeof cookies === 'string') {
    return cookie.parse(cookies);
  } else if (typeof cookies === 'object' && cookies !== null) {
    return cookies;
  } else {
    return {};
  }
}

export function isParsingCookie(value: Cookie, doNotParse?: boolean) {
  if (typeof doNotParse === 'undefined') {
    // We guess if the cookie start with { or [, it has been serialized
    doNotParse =
      !value || (value[0] !== '{' && value[0] !== '[' && value[0] !== '"');
  }

  return !doNotParse;
}

export function readCookie(value: Cookie, options: CookieGetOptions = {}) {
  if (isParsingCookie(value, options.doNotParse)) {
    try {
      return JSON.parse(value);
    } catch (e) {
      // At least we tried
    }
  }

  return value;
}
