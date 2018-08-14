// @ts-ignore
import Cookies, { CookieChangeOptions } from 'universal-cookie';

export default function universalCookieMiddleware() {
  return function(ctx: any, next: () => void) {
    ctx.request.universalCookies = new Cookies(ctx.request.headers.cookie || '')
    ctx.request.universalCookies.addEventListener((change: CookieChangeOptions) => {
      if (change.value === undefined) {
        ctx.cookies.set(change.name, null);
      } else {
        ctx.cookies.set(change.name, change.value, change.options);
      }
    });

    return next();
  };
}
