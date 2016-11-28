import cookie from '../cookie';

describe('react-cookie', () => {
  beforeEach(() => {
    cookie.setRawCookie('');
  });

  describe('load', () => {
    it('should not crash if cookies undefined', () => {
      expect(() => {
        cookie.setRawCookie(undefined);
      }).not.toThrowError();
    });

    it('should read the cookie', () => {
      cookie.setRawCookie('test=test');
      expect(cookie.load('test')).toBe('test');
    });

    it('should parse if an object', () => {
      cookie.setRawCookie('test={"test": true}');
      expect(cookie.load('test').test).toBe(true);
    });

    it('should not parse if not an object', function() {
      cookie.setRawCookie('test=1230.00');
      expect(cookie.load('test')).toBe('1230.00');
    });

    it('should not parse if we ask not to', function() {
      cookie.setRawCookie('test={"test": true}');
      expect(typeof cookie.load('test', true)).toBe('string');
    });
  });

  describe('select', function() {
    it('should not crash if cookies undefined', function() {
      expect(function() {
        cookie.setRawCookie(undefined);
      }).not.toThrow();

      expect(cookie.select(/^test/g)).toEqual({});
    });

    it('should select and read all the matching cookies into an object', function() {
      cookie.setRawCookie('test=foo;something=bar;foo=bar');
      expect(cookie.select(/(test|foo)/)).toEqual({ test: 'foo', foo: 'bar' });
    });

    it('should read all cookies into an object if no parameter is passed', function() {
      cookie.setRawCookie('test=foo;something=bar;foo=bar');
      expect(cookie.select()).toEqual({ test: 'foo', something: 'bar', foo: 'bar' });
    });
  });

  describe('save', function() {
    it('should not crash if not in the browser', function() {
      expect(function() {
        cookie.save('test', 'test');
      }).not.toThrow();
    });

    it('should update the value', function() {
      cookie.setRawCookie('test=test');
      expect(cookie.load('test')).toBe('test');

      cookie.save('test', 'other');
      expect(cookie.load('test')).not.toBe('test');
    });

    it('should stringify an object', function() {
      cookie.setRawCookie('test=test');
      expect(cookie.load('test')).toBe('test');

      cookie.save('test', { test: true });
      expect(typeof cookie.load('test')).toBe('object');
    });
  });

  describe('remove', function() {
    it('should do nothing if not in the browser', function() {
      expect(function() {
        cookie.remove('test');
      }).not.toThrow();
    });
  });


  describe('cookie', function() {
    describe('plugToRequest', function() {
      it('should load the request cookie', function() {
        cookie.plugToRequest({ cookie: { test: 123 } });
        expect(cookie.load('test')).toBe(123);
      });

      it('should load the request cookies', function() {
        cookie.plugToRequest({ cookies: { test: 123 } });
        expect(cookie.load('test')).toBe(123);
      });

      it('should load the raw cookie header', function() {
        cookie.plugToRequest({ headers: { cookie: 'test=123' } });
        expect(cookie.load('test')).toBe('123');
      });

      it('should clear the cookies if their is none', function() {
        cookie.setRawCookie('test=123');
        expect(cookie.load('test')).toBe('123');

        cookie.plugToRequest({});
        expect(cookie.load('test')).toBeUndefined();
      });
    });


    describe('unplug', function () {
      it('should return an unplug function', function() {
        const unplug = cookie.plugToRequest({ headers: { cookie: 'test=123' } });
        expect(typeof unplug).toBe('function');
      });

      it('should save cookie on the request before unplugged', function() {
        const cookieFunc = jest.fn();
        const req = { headers: { cookie: 'test=123' } };
        const res = { headersSent: false, cookie: cookieFunc };

        cookie.plugToRequest(req, res);
        cookie.save('test2', 'test2');
        expect(cookieFunc).toHaveBeenCalled();
      });

      it('should not change after head is sent', function() {
        const cookieFunc = jest.fn();
        const req = { headers: { cookie: 'test=123' } };
        const res = { headersSent: true, cookie: cookieFunc };

        cookie.plugToRequest(req, res);
        cookie.save('test2', 'test2');
        expect(cookieFunc).not.toHaveBeenCalled();
      });

      it('should not change after unplugged', () => {
        const cookieFunc = jest.fn();
        const req = { headers: { cookie: 'test=123' } };
        const res = { headersSent: false, cookie: cookieFunc };
        const unplug = cookie.plugToRequest(req, res);

        unplug();
        cookie.save('test2', 'test2');

        expect(cookieFunc).not.toHaveBeenCalled();
      });
    });
  });
});
