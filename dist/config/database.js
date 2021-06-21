"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/test';

const connect = () => _mongoose.default.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const close = () => _mongoose.default.connection.close();

var _default = {
  connect,
  connection: _mongoose.default.connection
};
exports.default = _default;