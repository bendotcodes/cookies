import React from 'react';
import { instanceOf, func } from 'prop-types';
import Cookies from 'universal-cookie';
import hoistStatics from 'hoist-non-react-statics';

export default function withCookies(Component) {
  function Wrapper(props, { cookies }) {
    const { wrappedComponentRef, ...remainingProps } = props;
    return (
      <Component
        {...remainingProps}
        cookies={cookies}
        ref={wrappedComponentRef}
      />
    );
  }

  Wrapper.displayName = `withCookies(${Component.displayName || Component.name})`;
  Wrapper.WrappedComponent = Component;

  Wrapper.propTypes = {
    wrappedComponentRef: func
  };

  Wrapper.contextTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  return hoistStatics(Wrapper, Component);
}
