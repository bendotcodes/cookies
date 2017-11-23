import React from 'react';
import { instanceOf } from 'prop-types';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { CookiesProvider, withCookies, Cookies } from '../';
import { cleanCookies } from 'universal-cookie/lib/utils';

function TestComponent({ cookies }) {
  return <div>{cookies.get('test')}</div>;
}

TestComponent.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

describe('withCookies(Component)', () => {
  beforeEach(() => {
    cleanCookies();
  });

  describe('on the browser', () => {
    it('provides the cookies', () => {
      document.cookie = 'test="big fat cat"';

      const Component = withCookies(TestComponent);
      const node = document.createElement('div');

      ReactDOM.render(
        <CookiesProvider>
          <Component />
        </CookiesProvider>,
        node
      );

      expect(node.innerHTML).toContain('big fat cat');
    });
  });

  describe('on the server', () => {
    it('provides the cookies', () => {
      const cookies = new Cookies('test="big fat cat"');
      // make sure Cookies thinks document.cookie is not accessible as it would be on a server
      cookies.HAS_DOCUMENT_COOKIE = false;

      const Component = withCookies(TestComponent);

      const html = ReactDOMServer.renderToString(
        <CookiesProvider cookies={cookies}>
          <Component />
        </CookiesProvider>
      );

      expect(html).toContain('big fat cat');
    });
  });
});
