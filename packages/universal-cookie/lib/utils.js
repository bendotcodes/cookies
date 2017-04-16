'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNode = isNode;

var _isNode = require('is-node');

var _isNode2 = _interopRequireDefault(_isNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNode() {
  return process.env.NODE_ENV === 'test' && typeof global.MOCK_IS_NODE === 'undefined' ? _isNode2.default : global.MOCK_IS_NODE;
}