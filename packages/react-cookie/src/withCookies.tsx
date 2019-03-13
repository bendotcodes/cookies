import Cookies from 'universal-cookie';
import * as React from 'react';

import { Consumer } from './CookiesContext';
import { ReactCookieProps } from './types';

// Only way to make function modules work with both TypeScript and Rollup
const hoistStatics = require('hoist-non-react-statics');

export default function withCookies<T>(
  WrapperComponent: React.ComponentType<T & ReactCookieProps>
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
        // @ts-ignore
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
