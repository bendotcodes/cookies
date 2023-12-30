import React from 'react';
import { object } from 'prop-types';
import { instanceOf } from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import { CookiesProvider, withCookies, Cookies } from '../';
import { cleanCookies } from '../../../universal-cookie/src/utils';
import { act, render, screen } from '@testing-library/react';

function TestComponent({ cookies }) {
  return <div>{cookies.get('test')}</div>;
}

TestComponent.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

function AllCookiesComponent({ allCookies }) {
  return (
    <ul>
      {Object.keys(allCookies).map((name) => (
        <li key={name}>
          {name}: {allCookies[name]}
        </li>
      ))}
    </ul>
  );
}

AllCookiesComponent.propTypes = {
  allCookies: object.isRequired,
};

TestComponent.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

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

  describe('on the browser', () => {
    it('provides the cookies', () => {
      document.cookie = 'test="big fat cat"';

      const Component = withCookies(TestComponent);

      render(
        <CookiesProvider>
          <Component />
        </CookiesProvider>,
      );

      expect(screen.getByText('big fat cat')).toBeInTheDocument();
    });

    it('update when a cookie change', () => {
      const cookies = new Cookies();
      cookies.set('test', 'big fat cat Pacman');

      const Component = withCookies(TestComponent);

      render(
        <CookiesProvider cookies={cookies}>
          <Component />
        </CookiesProvider>,
      );

      expect(screen.getByText('big fat cat Pacman')).toBeInTheDocument();

      act(() => {
        cookies.set('test', 'mean lean cat Suki');
      });

      expect(screen.queryByText('big fat cat Pacman')).not.toBeInTheDocument();
    });

    it('receive all cookies in props', () => {
      const cookies = new Cookies();
      const Component = withCookies(AllCookiesComponent);

      cookies.set('test1', 'value1');
      cookies.set('test2', 'value2');

      render(
        <CookiesProvider cookies={cookies}>
          <Component />
        </CookiesProvider>,
      );

      expect(screen.getByText('test1: value1')).toBeInTheDocument();
      expect(screen.getByText('test2: value2')).toBeInTheDocument();
    });

    it('forward the ref', () => {
      const cookies = new Cookies();
      const Component = withCookies(TestRefComponent);
      const ref = React.createRef();

      render(
        <CookiesProvider cookies={cookies}>
          <Component ref={ref} />
        </CookiesProvider>,
      );

      expect(ref.current.testValue).toBe('Suki is pretty');
    });

    it('provide the WrappedComponent', () => {
      const Component = withCookies(TestComponent);
      expect(Component.WrappedComponent).toBe(TestComponent);
    });

    it('format withCookies() with display name first', () => {
      const MyNameComponent = () => null;
      MyNameComponent.displayName = 'MyDisplayName';
      const Component = withCookies(MyNameComponent);
      expect(Component.displayName).toBe('withCookies(MyDisplayName)');
    });

    it('format withCookies() with name as fallback', () => {
      const MyNameComponent = () => null;
      const Component = withCookies(MyNameComponent);
      expect(Component.displayName).toBe('withCookies(MyNameComponent)');
    });
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
