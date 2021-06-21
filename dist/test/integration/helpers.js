"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _chai = _interopRequireDefault(require("chai"));

var _app = _interopRequireDefault(require("../../src/app.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.setupApp = _app.default;
global.supertest = _supertest.default;
global.expect = _chai.default.expect;