export type Cookie = any;

export class Cookies {
    constructor(
        cookieHeader?: string | object | null,
        hooks?: {
            onSet: (name: string, value: string, options?: CookieOptions) => void;
            onRemove: (name: string, options?: CookieOptions) => void;
        },
    );
    get: (key: string, options?: CookieGetOptions) => Cookie | undefined;
    getAll: (options?: CookieGetOptions) => Cookie[];
    set(name: string, value: string, options?: CookieSaveOptions): void;
    remove(name: string, options?: CookieSaveOptions): void;
    addChangeListener(callback: (CookieChangeOptions) => void): void;
    removeChangeListener(callback: (CookieChangeOptions) => void): void;
}

export interface CookieGetOptions {
    doNotParse?: boolean;
}

export interface CookieSaveOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
}
export interface CookieChangeOptions {
    name: string;
    value?: any,
    options?: ReactCookieOptions
}