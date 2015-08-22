var reactCookie = require('./index');

describe('load', function() {
  it('should not crash if cookies undefined', function() {
    expect(function() {
      reactCookie.setRawCookie(undefined);
    }).not.toThrow();

    expect(reactCookie.load('test')).toBe(undefined);
  });

  it('should read the cookie', function() {
    reactCookie.setRawCookie('test=test');
    expect(reactCookie.load('test')).toBe('test');
  });

  it('should parse if an object', function() {
    reactCookie.setRawCookie('test={"test": true}');
    expect(reactCookie.load('test').test).toBe(true);
  });

  it('should not parse if we ask not to', function() {
    reactCookie.setRawCookie('test={"test": true}');
    expect(typeof reactCookie.load('test', true)).toBe('string');
  });
});

describe('save', function() {
  it('should not crash if not in the browser', function() {
    expect(function() {
      reactCookie.save('test', 'test');
    }).not.toThrow();
  });

  it('should update the value', function() {
    reactCookie.setRawCookie('test=test');
    expect(reactCookie.load('test')).toBe('test');

    reactCookie.save('test', 'other');
    expect(reactCookie.load('test')).not.toBe('test');
  });

  it('should stringify an object', function() {
    reactCookie.setRawCookie('test=test');
    expect(reactCookie.load('test')).toBe('test');

    reactCookie.save('test', { test: true });
    expect(typeof reactCookie.load('test')).toBe('object');
  });
});

describe('remove', function() {
  it('should do nothing if not in the browser', function() {
    expect(function() {
      reactCookie.remove('test');
    }).not.toThrow();
  });
});
