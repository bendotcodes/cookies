import * as React from 'react';
export * from 'universal-cookie';

export type ReactCookieProps = {
    cookies?: Cookies
};

export class CookiesProvider extends React.Component<ReactCookieProps, any> {}
type Diff<T, U> = T extends U ? never : T;
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export declare function withCookies<T extends ReactCookieProps>(Component: React.ComponentType<T>): React.ComponentType<Omit<T, keyof ReactCookieProps>>;
