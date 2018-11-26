import Cookies from 'universal-cookie';
import * as React from 'react';

import { Consumer } from './CookiesContext';
import { ReactCookieProps } from './types';

// Only way to make function modules work with both TypeScript and Rollup
const hoistStatics = require('hoist-non-react-statics');

export default function withCookies<T>(WrapperComponent: React.ComponentType<T & ReactCookieProps>): React.ComponentType<T> {
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
        this.unlisten();
        this.cookies = cookies;
        this.cookies.addChangeListener(this.onChange);
      }
    }

    unlisten() {
      if (this.cookies) {
        this.cookies.removeChangeListener(this.onChange);
      }
    }

    componentDidMount() {
      this.listen(this.props.cookies);
    }

    componentDidUpdate() {
      this.listen(this.props.cookies);
    }

    componentWillUnmount() {
      this.unlisten();
    }

    render() {
      const { forwardedRef, cookies, ...restProps } = this.props;
      const allCookies = cookies.getAll();
      return (
        <WrapperComponent
          {...restProps}
          ref={forwardedRef}
          cookies={cookies}
          allCookies={allCookies}
        />
      );
    }
  }

  const CookieWrapperWithRefAndCookieConsumer = React.forwardRef(
    (props, ref) => {
      return (
        <Consumer>
          {(cookies: Cookies) => (
            <CookieWrapper cookies={cookies} {...props} forwardedRef={ref} />
          )}
        </Consumer>
      );
    }
  );

  return hoistStatics(CookieWrapperWithRefAndCookieConsumer, WrapperComponent, { WrappedComponent: true });
}
