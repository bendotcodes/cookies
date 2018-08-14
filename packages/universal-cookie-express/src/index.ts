// @ts-ignore
import Cookies, { CookieChangeOptions } from 'universal-cookie';

export default function universalCookieMiddleware() {
  return function(req: any, res: any, next: () => void) {
    req.universalCookies = new Cookies(req.headers.cookie || '');
    req.universalCookies.addEventListener((change: CookieChangeOptions) => {
      if (!res.cookie || res.headersSent) {
        return;
      }

      if (change.value === undefined) {
        res.clearCookie(change.name, change.options);
      } else {
        const expressOpt = Object.assign({}, change.options);
        if (expressOpt.maxAge) {
          // the standard for maxAge is seconds but express uses milliseconds
          expressOpt.maxAge = change.options.maxAge * 1000;
        }

        res.cookie(change.name, change.value, expressOpt);
      }
    });

    next();
  };
}
