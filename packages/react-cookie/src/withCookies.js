import React, { Component } from 'react';
import { instanceOf, func } from 'prop-types';
import Cookies from 'universal-cookie';
import hoistStatics from 'hoist-non-react-statics';

export default function withCookies(WrapperComponent) {
  class Wrapper extends Component {
    static displayName = `withCookies(${Component.displayName || Component.name})`;
    static WrapperComponent = WrapperComponent;

    static propTypes = {
      wrappedComponentRef: func
    };

    static contextTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

    constructor(props, context) {
      super(props);
      context.cookies.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
      this.context.cookies.removeChangeListener(this.onChange);
    }

    onChange = () => {
      this.forceUpdate();
    }

    render() {
      const { wrappedComponentRef, ...remainingProps } = this.props;
      const allCookies = this.context.cookies.getAll();

      return (
        <WrapperComponent
          {...remainingProps}
          cookies={this.context.cookies}
          allCookies={allCookies}
          ref={wrappedComponentRef}
        />
      );
    }
  }

  return hoistStatics(Wrapper, WrapperComponent, { WrappedComponent: true });
}
