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

  return hoistStatics(CookieWrapperWithRefAndCookieConsumer, WrapperComponent, {
    WrappedComponent: true
  });
}
