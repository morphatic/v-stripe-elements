"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VStripeInput", {
  enumerable: true,
  get: function get() {
    return _VStripeInput["default"];
  }
});
exports["default"] = void 0;

var _VStripeInput = _interopRequireDefault(require("./VStripeInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Vue.component('v-stripe-input', _VStripeInput["default"]);
  }
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map