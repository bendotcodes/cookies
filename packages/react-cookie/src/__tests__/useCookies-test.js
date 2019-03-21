import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ReactDOMServer from 'react-dom/server';
import { CookiesProvider, withCookies, useCookies, Cookies } from '../';
import { cleanCookies } from 'universal-cookie/lib/utils';
import { doesNotReject } from 'assert';

function TestComponent() {
  const [cookies] = useCookies();
  return <div>{cookies.test}</div>;
}

describe('useCookies', () => {
  beforeEach(() => {
    cleanCookies();
  });

  describe('on the browser', () => {
    it('provides the cookies', () => {
      document.cookie = 'test="big fat cat"';

      const node = document.createElement('div');

      ReactDOM.render(
        <CookiesProvider>
          <TestComponent />
        </CookiesProvider>,
        node
      );

      expect(node.innerHTML).toContain('big fat cat');
    });

    xit('update when a cookie change', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');

      const toRender = (
        <CookiesProvider cookies={cookies}>
          <TestComponent />
        </CookiesProvider>
      );

      cookies.set('test', 'big fat cat Pacman');
      ReactDOM.render(toRender, node);
      expect(node.innerHTML).toContain('big fat cat Pacman');

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
      });

      expect(node.innerHTML).toContain('mean lean cat Suki');
    }).pend(
      'Figure out how to trigger the React hook effect again in the test'
    );
  });

  describe('on the server', () => {
    it('provides the cookies', () => {
      const cookies = new Cookies('test="big fat cat"');
      // make sure Cookies thinks document.cookie is not accessible as it would be on a server
      cookies.HAS_DOCUMENT_COOKIE = false;

      const html = ReactDOMServer.renderToString(
        <CookiesProvider cookies={cookies}>
          <TestComponent />
        </CookiesProvider>
      );

      expect(html).toContain('big fat cat');
    });
  });
});
