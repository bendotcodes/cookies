declare module 'react-cookie' {
    import * as React from 'react';

    export type Cookie = string;

    export class Cookies {
        get: (key: string, options?: ReactCookieGetOptions) => Cookie;
        getAll: (options?: ReactCookieGetAllOptions) => Cookie[];
        set(name: string, value: string, options?: ReactCookieSetOptions): void;
        remove(name: string, options?: ReactCookieRemoveOptions): void;
    }

    export class CookiesProvider extends React.Component<{}, {}>{ }

    export function withCookies<T extends ReactCookieProps>(Component: React.ComponentClass<T>): React.ComponentClass<T>;

    export interface ReactCookieGetOptions {
        doNotParse?: boolean;
    }

    export interface ReactCookieGetAllOptions {
        doNotParse?: boolean;
    }

    export interface ReactCookieSetOptions {
        path?: string;
        expires?: Date;
        maxAge?: number;
        domain?: string;
        secure?: boolean;
        httpOnly?: boolean;
    }

    export interface ReactCookieRemoveOptions {
        path?: string;
        expires?: Date;
        maxAge?: number;
        domain?: string;
        secure?: boolean;
        httpOnly?: boolean;
    }

    export type ReactCookieProps = {
        cookies: Cookies
    };
}
