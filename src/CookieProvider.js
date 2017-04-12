import { Component } from 'react';
import { any, string, func, object, number } from 'prop-types';
import invariant from 'invariant';
import cookie from 'cookie';
import isNode from 'is-node';

export default class CookieProvider extends Component {
  static propTypes = {
    header: string,
    children: any,
    decode: func,
    pollInterval: number,
  };

  static defaultProps = {
    pollInterval: 100,
  };

  state = {
    cookies: this.readCookies(),
  };

  static childContextTypes = {
    cookies: object.isRequired,
  };

  getChildContext() {
    return {
      cookies: this.state.cookies,
    };
  }

  componentWillMount() {
    if (!isNode) {
      this.interval = setInterval(
        this.updateCookies.bind(this),
        this.props.pollInterval,
      );
    }
  }

  componentWillUnmount() {
    if (!isNode) {
      clearInterval(this.interval);
    }
  }

  readCookies() {
    invariant(
      !isNode || typeof this.props.header === 'string',
      'You must specify the header to the <CookieProvider> on the server-side',
    );

    const cookieString = isNode
      ? this.props.header
      : this.props.header || document.cookie;

    this.lastCookie = cookieString;

    return cookie.parse(cookieString, {
      decode: this.props.decode,
    });
  }

  updateCookies() {
    if (document.cookie !== this.lastCookie) {
      this.setState({
        cookies: this.readCookies(),
      });
    }
  }

  render() {
    return this.props.children;
  }
}
