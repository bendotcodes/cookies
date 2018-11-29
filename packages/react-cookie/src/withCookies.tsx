import Cookies, { Cookie } from 'universal-cookie';
import * as React from 'react';

import { Consumer } from './CookiesContext';

// Only way to make function modules work with both TypeScript and Rollup
const hoistStatics = require('hoist-non-react-statics');

type WrapperProps = {
  cookies: Cookies;
  allCookies: { [name: string]: Cookie };
  children?: any;
  ref?: React.RefObject<{}>;
};

export default function withCookies<T>(
  WrapperComponent: React.ComponentType<T & WrapperProps>
): React.ComponentType<T> {
  // @ts-ignore
  const name = WrapperComponent.displayName || WrapperComponent.name;

  class CookieWrapper extends React.Component<any, any> {
    static displayName = `withCookies(${name})`;
    static WrapperComponent = WrapperComponent;

    cookies?: Cookies;

    onChange = () => {
      // Make sure to update children with new values
      this.forceUpdate();
    };

    listen(cookies: Cookies) {
      if (cookies !== this.cookies) {
        this.unlisten();
        this.cookies = cookies;
        this.cookies.addChangeListener(this.onChange);
      }
    }

    unlisten() {
      if (this.cookies) {
        this.cookies.removeChangeListener(this.onChange);
        this.cookies = undefined;
      }
    }

    componentWillUnmount() {
      this.unlisten();
    }

    render() {
      return (
        <Consumer>
          {(cookies: Cookies) => {
            this.listen(cookies);
            const { forwardedRef, ...restProps } = this.props;

            const allCookies = cookies.getAll();
            return (
              <WrapperComponent
                {...restProps}
                ref={forwardedRef}
                cookies={cookies}
                allCookies={allCookies}
              />
            );
          }}
        </Consumer>
      );
    }
  }

  const CookieWrapperWithRef = React.forwardRef((props, ref) => {
    return <CookieWrapper {...props} forwardedRef={ref} />;
  });

  return hoistStatics(CookieWrapperWithRef, WrapperComponent, {
    WrappedComponent: true
  });
}
