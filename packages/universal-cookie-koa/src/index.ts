// @ts-ignore
import Cookies, { CookieChangeOptions } from 'universal-cookie';

export default function universalCookieMiddleware() {
  return function(ctx: any, next: () => void) {
    ctx.request.universalCookies = new Cookies(
      ctx.request.headers.cookie || ''
    );
    ctx.request.universalCookies.addChangeListener(
      (change: CookieChangeOptions) => {
        if (change.value === undefined) {
          ctx.cookies.set(change.name, null);
        } else {
          const koaOpt = (<any>Object).assign({}, change.options);
          if (koaOpt.maxAge && change.options && change.options.maxAge) {
            // the standard for maxAge is seconds but koa uses milliseconds
            koaOpt.maxAge = change.options.maxAge * 1000;
          };

          ctx.cookies.set(change.name, change.value, koaOpt);
        }
      }
    );

    return next();
  };
}
