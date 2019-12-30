import * as cookie from 'cookie';
import { Cookie, CookieGetOptions } from './types';

export function hasDocumentCookie() {
  // JSDOM does not support changing cookies, disable it for tests
  if (isJsDom() || cookieDisabledBySettings()) {
    return false;
  }

  // Can we get/set cookies on document.cookie?
  return typeof document === 'object' && typeof document.cookie === 'string';
}

function cookieDisabledBySettings() {
  if (typeof navigator !== 'object') {
      return false;
  }

  // user can disable cookie for site
  // in browser settings
  return navigator.cookieEnabled === false;
}

function isJsDom(): boolean {
  if (
    typeof navigator !== 'object' ||
    typeof navigator.userAgent !== 'string'
  ) {
    return false;
  }

  return (
    navigator.userAgent.indexOf('Node.js') >= 0 ||
    navigator.userAgent.indexOf('jsdom') >= 0
  );
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
  const cleanValue = cleanupCookieValue(value);
  if (isParsingCookie(cleanValue, options.doNotParse)) {
    try {
      return JSON.parse(cleanValue);
    } catch (e) {
      // At least we tried
    }
  }

  // Ignore clean value if we failed the deserialization
  // It is not relevant anymore to trim those values
  return value;
}

function cleanupCookieValue(value: Cookie): Cookie {
  // express prepend j: before serializing a cookie
  if (value && value[0] === 'j' && value[1] === ':') {
    return value.substr(2);
  }

  return value;
}
