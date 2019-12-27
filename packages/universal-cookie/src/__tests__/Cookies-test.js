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
  });

  describe('remove(name, [options])', () => {
    it('takes effect', () => {
      document.cookie = 'testingCookie=yes';
      const cookies = new Cookies();
      cookies.remove('testingCookie');
      expect(cookies.get('testingCookie')).toBeFalsy();
    });
  });

  describe('addChangeListener', () => {
    it('detect setting a cookie', done => {
      const cookies = new Cookies();

      cookies.addChangeListener(({ name, value, options }) => {
        expect(name).toBe('test');
        expect(value).toBe('meow');
        expect(options.path).toBe('/');
        done();
      });

      cookies.set('test', 'meow', { path: '/' });
    });

    it('detect removing a cookie', done => {
      const cookies = new Cookies();

      cookies.addChangeListener(({ name, value, options }) => {
        expect(name).toBe('test');
        expect(value).toBeUndefined();
        expect(options.path).toBe('/');
        done();
      });

      cookies.remove('test', { path: '/' });
    });

    it('stop when removing listener', done => {
      const cookies = new Cookies();

      const f = () => {
        throw new Error('Listener not properly removed');
      };
      cookies.addChangeListener(f);
      cookies.removeChangeListener(f);

      cookies.remove('test', 'boom!');

      setTimeout(() => {
        // The test throws if it fails
        // No exception in this test
        expect().nothing();
        done();
      });
    });
  });
});
