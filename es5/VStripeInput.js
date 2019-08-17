"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

require("../src/VStripeInput.sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var VStripeInput = _vue["default"].extend({
  render: function render(h) {
    return h('div', {
      "class": ['v-stripe-input']
    }, 'it works!');
  }
});

var _default = VStripeInput;
exports["default"] = _default;
//# sourceMappingURL=VStripeInput.js.map