/**
 * @jest-environment node
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CookiesProvider, withCookies, Cookies } from '..';
import { cleanCookies } from '../../../universal-cookie/src/utils';

function TestComponent({ cookies }) {
  return <div>{cookies.get('test')}</div>;
}

class TestRefComponent extends React.Component {
  testValue = 'Suki is pretty';

  render() {
    return <div>{this.testValue}</div>;
  }
}

describe('withCookies(Component)', () => {
  beforeEach(() => {
    cleanCookies();
  });

  describe('on the server', () => {
    it('provides the cookies', () => {
      const cookies = new Cookies('test="big fat cat"');
      cookies.HAS_DOCUMENT_COOKIE = false;

      const Component = withCookies(TestComponent);

      const html = ReactDOMServer.renderToString(
        <CookiesProvider cookies={cookies}>
          <Component />
        </CookiesProvider>,
      );

      expect(html).toContain('big fat cat');
    });
  });
});
