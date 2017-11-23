import Cookies from 'universal-cookie';

export default function universalCookieMiddleware() {
  return function(ctx, next) {
    ctx.request.universalCookies = new Cookies(
      ctx.request.headers.cookie || '',
      {
        onSet(name, value, options) {
          ctx.cookies.set(name, value, options);
        },
        onRemove(name) {
          ctx.cookies.set(name, null);
        }
      }
    );
    return next();
  };
}
