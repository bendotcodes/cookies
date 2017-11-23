// Can we get/set cookies on document.cookie?

export function hasDocumentCookie() {
  return typeof document === 'object' && typeof document.cookie === 'string';
}

//backwards compatibility
export const HAS_DOCUMENT_COOKIE = hasDocumentCookie();

export function cleanCookies() {
  document.cookie.split(';').forEach(function(c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
}
