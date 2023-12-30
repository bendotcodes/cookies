import Cookies from '../Cookies';
import { cleanCookies } from '../utils';

describe('Cookies', () => {
  beforeEach(() => {
    cleanCookies();
  });

  describe('constructor()', () => {
    it('read a cookie object', () => {
      const cookiesValues = { test: 'meow' };
      const cookies = new Cookies(cookiesValues);
      // we always call this in tests when ran from a context that
      // doesn't have document.cookie set properly
      cookies.HAS_DOCUMENT_COOKIE = false;
      expect(cookies.get('test')).toBe(cookiesValues.test);
    });

    it('read a cookie string', () => {
      const cookieValue = 'meow';
      const cookiesValues = 'test=' + cookieValue;
      const cookies = new Cookies(cookiesValues);
      cookies.HAS_DOCUMENT_COOKIE = false;
      expect(cookies.get('test')).toBe(cookieValue);
    });
  });

  describe('get(name, [optioons])', () => {
    it('read the real-time value', () => {
      const cookieValue = 'rreow';
      const cookies = new Cookies();

      // Set the cookie after context creation to make sure we don't cache values
      // We want to make sure the value is up-to-date with other libraries
      document.cookie = 'test=' + cookieValue;

      expect(cookies.get('test')).toBe(cookieValue);
    });

    it('parse serialized string', () => {
      const cookieValue = 'boom';
      const cookies = new Cookies({ test: '"' + cookieValue + '"' });
      cookies.HAS_DOCUMENT_COOKIE = false;
      expect(cookies.get('test')).toBe(cookieValue);
    });

    it('parse serialized object', () => {
      const cookies = new Cookies({ test: '{}' });
      cookies.HAS_DOCUMENT_COOKIE = false;
      expect(typeof cookies.get('test')).toBe('object');
    });

    it('parse serialized array', () => {
      const cookies = new Cookies({ test: '[]' });
      cookies.HAS_DOCUMENT_COOKIE = false;
      const result = cookies.get('test');

      expect(typeof result).toBe('object');
      expect(Array.isArray(result)).toBeTruthy();
    });

    it('parse serialized by express', () => {
      const cookies = new Cookies({ test: 'j:{}' });
      cookies.HAS_DOCUMENT_COOKIE = false;
      expect(typeof cookies.get('test')).toBe('object');
    });
  });

  describe('getAll([options])', () => {
    it('read the real-time values', () => {
      const cookies = new Cookies();

      // Set the cookie after context creation to make sure we don't cache values
      // We want to make sure the value is up-to-date with other libraries
      document.cookie = 'testingCookie=yes';
      document.cookie = 'testingCookie2=yup';
      const result = cookies.getAll();

      expect(result.testingCookie).toBe('yes');
      expect(result.testingCookie2).toBe('yup');
    });
  });

  describe('set(name, value, [options])', () => {
    it('works for string', () => {
      const cookies = new Cookies();
      cookies.set('test', 'meow');
      expect(cookies.get('test')).toBe('meow');
    });

    it('works for object', () => {
      const cookies = new Cookies();
      cookies.set('test', { cat: 'meow' });
      expect(cookies.get('test').cat).toBe('meow');
    });

    it('works for boolean', () => {
      const cookies = new Cookies();
      cookies.set('test', true);
      expect(cookies.get('test')).toBe(true);
    });
  });

  describe('remove(name, [options])', () => {
    it('takes effect', () => {
      document.cookie = 'testingCookie=yes';
      const cookies = new Cookies();
      cookies.remove('testingCookie');
      expect(cookies.get('testingCookie')).toBeFalsy();
    });

    it('default options are used', () => {
      document.cookie = 'testingCookie=yes; Path=/meow';
      const cookies = new Cookies(null, { path: `/meow` });
      cookies.remove('testingCookie');
      expect(cookies.get('testingCookie')).toBeFalsy();
    });
  });

  describe('addChangeListener', () => {
    it('detect setting a cookie', () => {
      const cookies = new Cookies();

      const onChange = jest.fn();
      cookies.addChangeListener(onChange);
      cookies.set('test', 'meow', { path: '/' });

      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith({
        name: 'test',
        value: 'meow',
        options: {
          path: '/',
        },
      });
    });

    it('keeps the value as original object', () => {
      const cookies = new Cookies();

      const onChange = jest.fn();
      cookies.addChangeListener(onChange);
      cookies.set('test', [0, 1, 2], { path: '/' });

      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith({
        name: 'test',
        value: [0, 1, 2],
        options: {
          path: '/',
        },
      });
    });

    it('default options are used', () => {
      const cookies = new Cookies(null, { path: '/meow' });

      const onChange = jest.fn();
      cookies.addChangeListener(onChange);
      cookies.set('test', 'test');

      expect(onChange).toBeCalledWith({
        name: 'test',
        value: 'test',
        options: {
          path: '/meow',
        },
      });
    });

    it('options override the default options', () => {
      const cookies = new Cookies(null, { path: '/meow' });

      const onChange = jest.fn();
      cookies.addChangeListener(onChange);
      cookies.set('test', 'test', { path: '/woof' });

      expect(onChange).toBeCalledWith({
        name: 'test',
        value: 'test',
        options: {
          path: '/woof',
        },
      });
    });

    it('detect removing a cookie', () => {
      const cookies = new Cookies();

      const onChange = jest.fn();
      cookies.addChangeListener(onChange);
      cookies.remove('test', { path: '/' });

      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith({
        name: 'test',
        value: undefined,
        options: {
          path: '/',
          maxAge: 0,
          expires: new Date(1970, 1, 1, 0, 0, 1),
        },
      });
    });

    it('stop when removing listener', () => {
      const cookies = new Cookies();

      const onChange = jest.fn();
      cookies.addChangeListener(onChange);
      cookies.removeChangeListener(onChange);

      cookies.remove('test', 'boom!');
      expect(onChange).not.toBeCalled();
    });
  });
});
