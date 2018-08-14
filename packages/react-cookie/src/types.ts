import Cookies from 'universal-cookie';
import { Cookie } from 'universal-cookie';

export type ReactCookieProps = {
    cookies: Cookies,
    allCookies: { [name: string]: Cookie }
    children?: any,
    ref?: React.RefObject<{}>
};
