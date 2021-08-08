import Cookies from 'universal-cookie';
import * as React from 'react';
import * as hoistStatics from 'hoist-non-react-statics';

import { Consumer } from './CookiesContext';
import { ReactCookieProps } from './types';

type Diff<T, U> = T extends U ? never : T;
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export default function withCookies<T extends ReactCookieProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<Omit<T, keyof ReactCookieProps>> {
  // @ts-ignore
  const name = WrappedComponent.displayName || WrappedComponent.name;

  class CookieWrapper extends React.Component<any, any> {
    static displayName = `withCookies(${name})`;
    static WrappedComponent = WrappedComponent;

    onChange = () => {
      // Make sure to update children with new values
      this.forceUpdate();
    };

    listen() {
      this.props.cookies.addChangeListener(this.onChange);
    }

    unlisten(cookies?: Cookies) {
      (cookies || this.props.cookies).removeChangeListener(this.onChange);
    }

    componentDidMount() {
      this.listen();
    }

    componentDidUpdate(prevProps: any) {
      if (prevProps.cookies !== this.props.cookies) {
        this.unlisten(prevProps.cookies);
        this.listen();
      }
    }

    componentWillUnmount() {
      this.unlisten();
    }

    render() {
      const { forwardedRef, cookies, ...restProps } = this.props;
      const allCookies = cookies.getAll();
      return (
        <WrappedComponent
          {...(restProps as T)}
          ref={forwardedRef}
          cookies={cookies}
          allCookies={allCookies}
        />
      );
    }
  }

  const ForwardedComponent: any = React.forwardRef((props: any, ref: any) => {
    return (
      <Consumer>
        {(cookies: Cookies) => (
          <CookieWrapper cookies={cookies} {...props} forwardedRef={ref} />
        )}
      </Consumer>
    );
  });

  ForwardedComponent.displayName = CookieWrapper.displayName;
  ForwardedComponent.WrappedComponent = CookieWrapper.WrappedComponent;

  return hoistStatics(ForwardedComponent, WrappedComponent);
}
