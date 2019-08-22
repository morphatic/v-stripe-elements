"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VStripeCard", {
  enumerable: true,
  get: function get() {
    return _VStripeCard["default"];
  }
});
exports["default"] = void 0;

var _VStripeCard = _interopRequireDefault(require("./VStripeCard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var VStripeElements = {
  install: function install(Vue, options) {
    Vue.component('v-stripe-card', _VStripeCard["default"]);
  }
};
var _default = VStripeElements;
exports["default"] = _default;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VStripeElements);
}
//# sourceMappingURL=index.js.map