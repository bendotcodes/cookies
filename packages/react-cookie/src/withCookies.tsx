import * as React from 'react';
// @ts-ignore
import * as hoistStatics from 'hoist-non-react-statics';
import { Consumer } from './CookiesContext';
import Cookies from 'universal-cookie';
import { ReactCookieProps } from './types';

export default function withCookies<T extends ReactCookieProps>(WrapperComponent: React.ComponentType<T>): React.ComponentType {
  // @ts-ignore
  const name = WrapperComponent.displayName || WrapperComponent.name;

  class CookieWrapper extends React.Component<any, any> {
    static displayName = `withCookies(${name})`;
    static WrapperComponent = WrapperComponent;

    cookies?: Cookies;

    onChange = () => {
      // Make sure to update children with new values
      this.forceUpdate();
    }

    listen(cookies: Cookies) {
      if (cookies !== this.cookies) {
        this.cookies = cookies;
        this.cookies.addChangeListener(this.onChange);
      }
    }

    unlisten() {
      if (this.cookies) {
        this.cookies.removeChangeListener(this.onChange);
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

            const allCookies = cookies.getAll();
            return (
              <WrapperComponent
                {...this.props}
                cookies={cookies}
                allCookies={allCookies}
              />
            );
          }}
        </Consumer>
      );
    }
  }

  return hoistStatics(CookieWrapper, WrapperComponent, { WrappedComponent: true });
}
