'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cookie = require('cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cookies = function () {
  function Cookies(cookies, hooks) {
    _classCallCheck(this, Cookies);

    if ((0, _utils.isNode)()) {
      if (typeof cookies === 'string') {
        this.cookies = _cookie2.default.parse(cookies);
      } else if ((typeof cookies === 'undefined' ? 'undefined' : _typeof(cookies)) === 'object') {
        this.cookies = cookies;
      } else {
        throw new Error('Missing the cookie header or object');
      }

      this.hooks = hooks;
    } else if (cookies) {
      throw new Error('The browser should not provide the cookies');
    }
  }

  _createClass(Cookies, [{
    key: 'get',
    value: function get(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var values = this.cookies || _cookie2.default.parse(document.cookie);
      return readCookie(values[name], options);
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var values = this.cookies || _cookie2.default.parse(document.cookie);
      var result = {};

      for (var name in values) {
        result[name] = readCookie(values[name], options);
      }

      return result;
    }
  }, {
    key: 'set',
    value: function set(name, value, options) {
      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
        value = JSON.stringify(value);
      }

      if ((0, _utils.isNode)()) {
        this.cookies[name] = value;

        if (this.hooks && this.hooks.onSet) {
          this.hooks.onSet(name, value, options);
        }
      } else {
        document.cookie = _cookie2.default.serialize(name, value, options);
      }
    }
  }, {
    key: 'remove',
    value: function remove(name, options) {
      var finalOptions = options = (0, _objectAssign2.default)({}, options, {
        expires: new Date(1970, 1, 1, 0, 0, 1),
        maxAge: 0
      });

      if ((0, _utils.isNode)()) {
        delete this.cookies[name];

        if (this.hooks && this.hooks.onSet) {
          this.hooks.onRemove(name, finalOptions);
        }
      } else {
        document.cookie = _cookie2.default.serialize(name, '', finalOptions);
      }
    }
  }]);

  return Cookies;
}();

exports.default = Cookies;


function isParsingCookie(value, doNotParse) {
  if (typeof doNotParse === 'undefined') {
    // We guess if the cookie start with { or [, it has been serialized
    doNotParse = !value || value[0] !== '{' && value[0] !== '[';
  }

  return !doNotParse;
}

function readCookie(value, options) {
  if (isParsingCookie(value, options.doNotParse)) {
    try {
      return JSON.parse(value);
    } catch (e) {
      // At least we tried
    }
  }

  return value;
}
module.exports = exports['default'];