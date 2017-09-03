// Can we get/set cookies on document.cookie?
export const HAS_DOCUMENT_COOKIE =
  typeof document === 'object' && typeof document.cookie === 'string';

export function cleanCookies() {
  document.cookie.split(';').forEach(function(c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
}
