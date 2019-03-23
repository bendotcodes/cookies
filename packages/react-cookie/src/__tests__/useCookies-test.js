import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ReactDOMServer from 'react-dom/server';
import { CookiesProvider, withCookies, useCookies, Cookies } from '../';
import { cleanCookies } from 'universal-cookie/lib/utils';

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

      ReactDOM.render(
        <CookiesProvider>
          <TestComponent />
        </CookiesProvider>,
        node
      );

      expect(node.innerHTML).toContain('big fat cat');
    });

    it('update when a cookie change', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');

      const toRender = (
        <CookiesProvider cookies={cookies}>
          <TestComponent />
        </CookiesProvider>
      );

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('mean lean cat Suki');
    });

    it('clear the change subscription on unmount', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');

      act(() => {
        ReactDOM.render(
          <CookiesProvider cookies={cookies}>
            <TestComponent />
          </CookiesProvider>,
          node
        );
      });

      expect(cookies.changeListeners.length).toBe(1);

      act(() => {
        ReactDOM.render(null, node);
      });

      expect(cookies.changeListeners.length).toBe(0);
    });

    it('re-render if a dependency changes', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');

      const toRender = (
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={['test']} />
        </CookiesProvider>
      );

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('mean lean cat Suki');
    });

    it('re-render if a dependency changes multiple times', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');

      const toRender = (
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={['test']} />
        </CookiesProvider>
      );

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('mean lean cat Suki');

      act(() => {
        cookies.set('test', 'good old Yuki');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('good old Yuki');
    });

    it('re-render if a dependency changes back to initial value after single change', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');

      const toRender = (
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={['test']} />
        </CookiesProvider>
      );

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('mean lean cat Suki');

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');
    });

    it('does not re-render if no dependency changes', () => {
      const cookies = new Cookies();
      const node = document.createElement('div');

      const toRender = (
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={[]} />
        </CookiesProvider>
      );

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
        ReactDOM.render(toRender, node);
      });

      expect(node.innerHTML).toContain('big fat cat Pacman');
    });
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
