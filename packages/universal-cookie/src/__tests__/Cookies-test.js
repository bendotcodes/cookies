import Cookies, { parseCookies, readCookie } from '../Cookies';
import { cleanCookies } from '../utils';

describe('Cookies', () => {
  beforeEach(() => {
    cleanCookies();
  });

  describe('constructor()', () => {
    it('read a cookie object', () => {
      const cookiesValues = { test: 'meow' };
      const cookies = parseCookies(cookiesValues);
      expect(readCookie(cookies.test)).toBe(cookiesValues.test);
    });

    it('read a cookie string', () => {
      const cookieValue = 'meow';
      const cookiesValues = 'test=' + cookieValue;
      const cookies = parseCookies(cookiesValues);

      expect(readCookie(cookies.test)).toBe(cookieValue);
    });

    it('hooks on set', () => {
      const hooks = {
        onSet: () => {}
      };

      const setSpy = spyOn(hooks, 'onSet');
      const cookies = new Cookies('', hooks);
      cookies.set('test', 'meow');

      expect(setSpy).toHaveBeenCalled();
    });

    it('hooks on remove', () => {
      const hooks = {
        onRemove: () => {}
      };

      const removeSpy = spyOn(hooks, 'onRemove');
      const cookieHeader = 'testingCookie=yes';
      const cookies = new Cookies(cookieHeader, hooks);
      cookies.remove('testingCookie');

      expect(removeSpy).toHaveBeenCalled();
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
      const cookies = parseCookies({ test: '"' + cookieValue + '"' });
      expect(readCookie(cookies.test)).toBe(cookieValue);
    });

    it('parse serialized object', () => {
      const cookies = parseCookies({ test: '{}' });
      expect(typeof readCookie(cookies.test)).toBe('object');
    });

    it('parse serialized array', () => {
      const cookies = parseCookies({ test: '[]' });
      const result = readCookie(cookies.test);

      expect(typeof result).toBe('object');
      expect(Array.isArray(result)).toBeTruthy();
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

    it('works for obejct', () => {
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
      expect(cookies.get('testingCookie')).toBe(undefined);
    });
  });
});
