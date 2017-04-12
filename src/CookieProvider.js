import { Component } from 'react';
import { any, string, func, object, number } from 'prop-types';
import cookie from 'cookie';
import isNode from 'is-node';

export default class CookieProvider extends Component {
  static propTypes = {
    header: isNode ? string.isRequired : string,
    children: any,
    decode: func,
    pollInterval: number,
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
    if (!isNode && this.props.pollInterval > 0) {
      this.interval = setInterval(
        this.updateCookies.bind(this),
        this.props.pollInterval,
      );
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  readCookies() {
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
