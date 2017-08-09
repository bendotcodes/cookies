import { Component } from 'react';
import { instanceOf, node } from 'prop-types';
import Cookies from 'universal-cookie';
import { isNode } from 'universal-cookie/lib/utils';

export default class CookiesProvider extends Component {
  static propTypes = {
    children: node,
    cookies: instanceOf(Cookies)
  };

  static childContextTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    if (props.cookies) {
      this.cookies = props.cookies;
    } else {
      this.cookies = new Cookies();
    }
  }

  getChildContext() {
    return {
      cookies: this.cookies
    };
  }

  render() {
    return this.props.children;
  }
}

if (isNode()) {
  CookiesProvider.propTypes.cookies = instanceOf(Cookies).isRequired;
}
