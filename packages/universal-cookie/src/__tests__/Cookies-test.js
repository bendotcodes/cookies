import Cookies from '../Cookies';
import { cleanCookies } from '../utils';

describe('Cookies', () => {
  beforeEach(() => {
    cleanCookies();
  });

  describe('on the browser', () => {
    describe('constructor()', () => {
      it('takes no parameter', () => {
        expect(() => {
          new Cookies('testingCookie=yes');
        }).toThrow(new Error('The browser should not provide the cookies'));
      });
    });

    describe('get(name, [options])', () => {
      it('read the real-time value', () => {
        const cookiesContext = new Cookies();

        // Set the cookie after context creation to make sure we don't cache values
        // We want to make sure the value is up-to-date with other libraries
        document.cookie = 'testingCookie=yes';

        expect(cookiesContext.get('testingCookie')).toBe('yes');
      });
    });

    describe('getAll([options])', () => {
      it('read the real-time values', () => {
        const cookiesContext = new Cookies();

        // Set the cookie after context creation to make sure we don't cache values
        // We want to make sure the value is up-to-date with other libraries
        document.cookie = 'testingCookie=yes';
        document.cookie = 'testingCookie2=yup';
        const cookies = cookiesContext.getAll();

        expect(cookies.testingCookie).toBe('yes');
        expect(cookies.testingCookie2).toBe('yup');
      });
    });

    describe('set(name, value, [options])', () => {
      it('works for string', () => {
        const cookiesContext = new Cookies();
        cookiesContext.set('test', 'meow');
        expect(cookiesContext.get('test')).toBe('meow');
      });

      it('works for obejct', () => {
        const cookiesContext = new Cookies();
        cookiesContext.set('test', { cat: 'meow' });
        expect(cookiesContext.get('test').cat).toBe('meow');
      });
    });

    describe('remove(name, [options])', () => {
      it('takes effect', () => {
        document.cookie = 'testingCookie=yes';
        const cookiesContext = new Cookies();
        cookiesContext.remove('testingCookie');
        expect(cookiesContext.get('testingCookie')).toBe(undefined);
      });
    });
  });

  describe('on the server', () => {
    beforeEach(() => {
      global.MOCK_IS_NODE = true;
    });

    afterEach(() => {
      delete global.MOCK_IS_NODE;
    });

    describe('constructor(cookieHeader, [hooks])', () => {
      it('contains cookie header or object', () => {
        expect(() => {
          new Cookies();
        }).toThrow(new Error('Missing the cookie header or object'));
      });

      it('hooks on set', () => {
        const hooks = {
          onSet: () => {},
          onRemove: () => {}
        };

        const setSpy = spyOn(hooks, 'onSet');
        const cookiesContext = new Cookies('', hooks);
        cookiesContext.set('test', 'meow');

        expect(setSpy).toHaveBeenCalled();
      });

      it('hooks on remove', () => {
        const hooks = {
          onSet: () => {},
          onRemove: () => {}
        };

        const removeSpy = spyOn(hooks, 'onRemove');
        const cookieHeader = 'testingCookie=yes';
        const cookiesContext = new Cookies(cookieHeader, hooks);
        cookiesContext.remove('testingCookie');

        expect(removeSpy).toHaveBeenCalled();
      });
    });

    describe('get(name, [options])', () => {
      it('read from the provided cookie header', () => {
        const cookieHeader = 'testingCookie=yes';
        const cookiesContext = new Cookies(cookieHeader);
        expect(cookiesContext.get('testingCookie')).toBe('yes');
      });

      it('read from the provided cookie object', () => {
        const cookies = {
          testingCookie: 'yes'
        };

        const cookiesContext = new Cookies(cookies);
        expect(cookiesContext.get('testingCookie')).toBe('yes');
      });
    });

    describe('getAll([options])', () => {
      it('read all values', () => {
        const cookieHeader = 'testingCookie=yes; testingCookie2=yup';
        const cookiesContext = new Cookies(cookieHeader);
        const cookies = cookiesContext.getAll();

        expect(cookies.testingCookie).toBe('yes');
        expect(cookies.testingCookie2).toBe('yup');
      });
    });

    describe('set(name, value, [options])', () => {
      it('takes effect', () => {
        const cookiesContext = new Cookies('');
        cookiesContext.set('test', 'meow');
        expect(cookiesContext.get('test')).toBe('meow');
      });
    });

    describe('remove(name, [options])', () => {
      it('takes effect', () => {
        const cookieHeader = 'testingCookie=yes';
        const cookiesContext = new Cookies(cookieHeader);
        cookiesContext.remove('testingCookie');
        expect(cookiesContext.get('testingCookie')).toBe(undefined);
      });
    });
  });
});
