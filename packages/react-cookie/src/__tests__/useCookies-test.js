import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { cleanCookies } from 'universal-cookie/lib/utils';
import { act, render, screen } from '@testing-library/react';

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

      render(
        <CookiesProvider>
          <TestComponent />
        </CookiesProvider>,
      );

      expect(screen.getByText('big fat cat')).toBeInTheDocument();
    });

    it('update when a cookie change', () => {
      const cookies = new Cookies();
      cookies.set('test', 'big fat cat Pacman');

      render(
        <CookiesProvider cookies={cookies}>
          <TestComponent />
        </CookiesProvider>,
      );

      expect(screen.getByText('big fat cat Pacman')).toBeInTheDocument();

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
      });

      expect(screen.getByText('mean lean cat Suki')).toBeInTheDocument();
    });

    it('update when a cookie is removed', () => {
      const cookies = new Cookies();
      cookies.set('test', 'big fat cat Pacman');

      render(
        <CookiesProvider cookies={cookies}>
          <TestComponent />
        </CookiesProvider>,
      );

      expect(screen.getByText('big fat cat Pacman')).toBeInTheDocument();

      act(() => {
        cookies.remove('test');
      });

      expect(screen.queryByText('big fat cat Pacman')).not.toBeInTheDocument();
    });

    it('clear the change subscription on unmount', () => {
      const cookies = new Cookies();

      const { rerender } = render(
        <CookiesProvider cookies={cookies}>
          <TestComponent />
        </CookiesProvider>,
      );

      expect(cookies.changeListeners.length).toBe(1);

      rerender(null);

      expect(cookies.changeListeners.length).toBe(0);
    });

    it('re-render if a dependency changes', () => {
      const cookies = new Cookies();
      cookies.set('test', 'big fat cat Pacman');

      render(
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={['test']} />
        </CookiesProvider>,
      );

      expect(screen.getByText('big fat cat Pacman')).toBeInTheDocument();

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
      });

      expect(screen.getByText('mean lean cat Suki')).toBeInTheDocument();
    });

    it('re-render if a dependency changes multiple times', () => {
      const cookies = new Cookies();
      cookies.set('test', 'big fat cat Pacman');

      render(
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={['test']} />
        </CookiesProvider>,
      );

      expect(screen.getByText('big fat cat Pacman')).toBeInTheDocument();

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
      });

      expect(screen.getByText('mean lean cat Suki')).toBeInTheDocument();

      act(() => {
        cookies.set('test', 'good old Yuki');
      });

      expect(screen.getByText('good old Yuki')).toBeInTheDocument();
    });

    it('re-render if a dependency changes and go back', () => {
      const cookies = new Cookies();

      render(
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={['test']} />
        </CookiesProvider>,
      );

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
      });

      expect(screen.getByText('big fat cat Pacman')).toBeInTheDocument();

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
      });

      expect(screen.getByText('mean lean cat Suki')).toBeInTheDocument();

      act(() => {
        cookies.set('test', 'big fat cat Pacman');
      });

      expect(screen.getByText('big fat cat Pacman')).toBeInTheDocument();
    });

    it('does not re-render if no dependency changes', () => {
      const cookies = new Cookies();
      cookies.set('test', 'big fat cat Pacman');

      render(
        <CookiesProvider cookies={cookies}>
          <TestComponent dependencies={[]} />
        </CookiesProvider>,
      );

      expect(screen.getByText('big fat cat Pacman')).toBeInTheDocument();

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
      });

      expect(screen.getByText('big fat cat Pacman')).toBeInTheDocument();
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
