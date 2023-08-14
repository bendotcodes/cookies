import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import ReactDOMServer from 'react-dom/server';
import { cleanCookies } from 'universal-cookie/lib/utils';

import { CookiesProvider, useCookies, Cookies } from '../';
import * as Utils from '../utils';

function TestComponent({ dependencies }) {
  const [cookies] = useCookies(dependencies);
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
      const root = ReactDOM.createRoot(node);

      act(() => {
        root.render(
          <CookiesProvider>
            <TestComponent />
          </CookiesProvider>,
        );
      });

      expect(node.innerHTML).toContain('big fat cat');
    });

    it('update when a cookie change', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');
      const root = ReactDOM.createRoot(node);

      const toRender = (
        <CookiesProvider cookies={cookies}>
          <TestComponent />
        </CookiesProvider>
      );

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('mean lean cat Suki');
    });

    it('clear the change subscription on unmount', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');
      const root = ReactDOM.createRoot(node);

      act(() => {
        root.render(
          <CookiesProvider cookies={cookies}>
            <TestComponent />
          </CookiesProvider>,
        );
      });

      expect(cookies.changeListeners.length).toBe(1);

      act(() => {
        root.render(null);
      });

      expect(cookies.changeListeners.length).toBe(0);
    });

    it('re-render if a dependency changes', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');
      const root = ReactDOM.createRoot(node);

      const toRender = (
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={['test']} />
        </CookiesProvider>
      );

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('mean lean cat Suki');
    });

    it('re-render if a dependency changes multiple times', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');
      const root = ReactDOM.createRoot(node);

      const toRender = (
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={['test']} />
        </CookiesProvider>
      );

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('mean lean cat Suki');

      act(() => {
        cookies.set('test', 'good old Yuki');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('good old Yuki');
    });

    it('re-render if a dependency changes and go back', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');
      const root = ReactDOM.createRoot(node);

      const toRender = (
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={['test']} />
        </CookiesProvider>
      );

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('mean lean cat Suki');

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');
    });

    it('does not re-render if no dependency changes', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');
      const root = ReactDOM.createRoot(node);

      const toRender = (
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={[]} />
        </CookiesProvider>
      );

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
        root.render(toRender);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');
    });
  });

  describe('on the server', () => {
    beforeEach(() => {
      jest.spyOn(Utils, 'isInBrowser').mockReturnValue(false);
    });

    it('provides the cookies', () => {
      const cookies = new Cookies('test="big fat cat"');
      cookies.HAS_DOCUMENT_COOKIE = false;

      const html = ReactDOMServer.renderToString(
        <CookiesProvider cookies={cookies}>
          <TestComponent />
        </CookiesProvider>,
      );

      expect(html).toContain('big fat cat');
    });

    it('does not track changes', () => {
      const cookies = new Cookies('test="big fat cat"');
      jest.spyOn(React, 'useLayoutEffect');

      ReactDOMServer.renderToString(
        <CookiesProvider cookies={cookies}>
          <TestComponent />
        </CookiesProvider>,
      );

      expect(React.useLayoutEffect).not.toHaveBeenCalled();
    });
  });
});
