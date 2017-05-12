import Cookies from 'universal-cookie';

export default function universalCookieMiddleware() {
  return function(req, res, next) {
    req.universalCookies = new Cookies(req.headers.cookie || '', {
      onSet(name, value, options) {
        if (!res.cookie || res.headersSent) {
          return;
        }

        const expressOpt = { ...options };
        if (expressOpt.maxAge) {
          // the standard for maxAge is seconds but express uses milliseconds
          expressOpt.maxAge = options.maxAge * 1000;
        }

        res.cookie(name, value, expressOpt);
      },
      onRemove(name, options) {
        if (!res.clearCookie || res.headersSent) {
          return;
        }

        res.clearCookie(name, options);
      }
    });
    next();
  };
}
