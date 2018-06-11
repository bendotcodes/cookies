import * as React from 'react';

export type Cookie = string;

export class Cookies {
    constructor(
        cookieHeader?: string | object | null,
        hooks?: {
            onSet: (name: string, value: string, options?: ReactCookieSetOptions) => void;
            onRemove: (name: string, options?: ReactCookieRemoveOptions) => void;
        },
    );
    get: (key: string, options?: ReactCookieGetOptions) => Cookie | undefined;
    getAll: (options?: ReactCookieGetAllOptions) => Cookie[];
    set(name: string, value: string, options?: ReactCookieSetOptions): void;
    remove(name: string, options?: ReactCookieRemoveOptions): void;
}

export class CookiesProvider extends React.Component<ReactCookieProps, any> {}
type Diff<T, U> = T extends U ? never : T;
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export declare function withCookies<T extends ReactCookieProps>(Component: React.ComponentType<T>): React.ComponentType<Omit<T, keyof ReactCookieProps>>;

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
    cookies?: Cookies
};
