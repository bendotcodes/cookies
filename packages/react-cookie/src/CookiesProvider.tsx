import * as React from 'react';
import Cookies from 'universal-cookie';
import { ReactCookieProps } from './types';

import { Provider } from './CookiesContext';

export default class CookiesProvider extends React.Component<
  ReactCookieProps,
  any
> {
  cookies: Cookies;

  constructor(props: ReactCookieProps) {
    super(props);

    if (props.cookies) {
      this.cookies = props.cookies;
    } else {
      this.cookies = new Cookies();
    }
  }

  render() {
    return <Provider value={this.cookies}>{this.props.children}</Provider>;
  }
}
