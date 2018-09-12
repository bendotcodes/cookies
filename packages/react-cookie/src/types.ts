import Cookies, { CookiesByName } from 'universal-cookie';

export type ReactCookieProps = {
    cookies?: Cookies,
    allCookies?: CookiesByName
    children?: any,
    ref?: React.RefObject<{}>
};
