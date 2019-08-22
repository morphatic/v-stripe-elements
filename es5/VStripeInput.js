"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

require("../src/VStripeInput.sass");

var _lib = require("vuetify/lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Create Base Mixins and Properties
var base = _vue["default"].extend({
  mixins: [_lib.VTextField]
}); // Extend VTextField to define the VStripeInput component


var _default2 = base.extend().extend({
  name: 'v-stripe-input',
  props: {
    apiKey: {
      type: String,
      required: true
    },
    font: {
      type: String,
      "default": 'Roboto'
    },
    hideIcon: Boolean,
    hidePostalCode: Boolean,
    iconStyle: {
      type: String,
      "default": 'default'
    },
    tokenOptions: {
      type: Object,
      "default": function _default() {
        return {
          name: '',
          address_line1: '',
          address_line2: '',
          address_city: '',
          address_state: '',
          address_zip: '',
          address_country: ''
        };
      }
    },
    zip: {
      type: String,
      "default": ''
    }
  },
  data: function data() {
    return {
      card: null,
      elements: null,
      isReady: false,
      okToSubmit: false,
      stripe: null
    };
  },
  computed: {
    classes: function classes() {
      return _objectSpread({}, _lib.VTextField.options.computed.classes.call(this), {
        'v-stripe-input': true
      });
    }
  },
  watch: {
    isDark: function isDark(val, oldVal) {
      if (val !== oldVal && this.card !== null) {
        var style = this.genStyle(this.font, this.$vuetify.theme.currentTheme, this.$vuetify.theme.dark);
        this.card.update({
          style: style
        });
      }
    },
    isDisabled: function isDisabled(val, oldVal) {
      if (val !== oldVal && this.card !== null) {
        this.card.update({
          disabled: val
        });
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    // Handle tasks NOT related to actual DOM rendering or manipulation
    var cardProps = {
      classes: {
        focus: 'focus',
        empty: 'empty'
      },
      disabled: this.disabled,
      hideIcon: this.hideIcon,
      hidePostalCode: this.hidePostalCode,
      iconStyle: this.iconStyle,
      style: this.genStyle(this.font, this.$vuetify.theme.currentTheme, this.$vuetify.theme.dark)
    };
    this.zip && (cardProps.value = {
      postalCode: this.zip
    });
    this.loadStripe() // initialize the Stripe.js object
    .then(function () {
      _this.stripe = Stripe(_this.apiKey);
    }) // eslint-disable-line no-undef
    // then create a Stripe elements generator
    .then(function () {
      _this.elements = _this.stripe && _this.stripe.elements(_this.genFont(_this.font));
    }) // then create a card element, setup card events, and mount the card
    .then(function () {
      _this.card = _this.elements && _this.elements.create('card', cardProps);

      if (_this.card !== null) {
        _this.card.on('blur', _this.onCardBlur);

        _this.card.on('change', _this.onCardChange);

        _this.card.on('focus', _this.onCardFocus);

        _this.card.on('ready', _this.onCardReady);

        _this.card.mount("#".concat(_this.computedId));
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  methods: {
    clearableCallback: function clearableCallback() {
      this.card !== null && this.card.clear();

      _lib.VTextField.options.methods.clearableCallback.call(this);
    },

    /**
     * Converts the collected payment information into a single-use token
     * that can safely be passed to your backend API server where a
     * payment request can be processed.
     * See {@link|https://stripe.com/docs/stripe-js/reference#stripe-create-token}
     */
    createToken: function () {
      var _createToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, token, error;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.stripe === null || this.card === null)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.next = 4;
                return this.stripe.createToken(this.card, this.tokenOptions);

              case 4:
                _ref = _context.sent;
                token = _ref.token;
                error = _ref.error;

                if (!error) {// do something
                } else {
                  this.$emit('input', token);
                }

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createToken() {
        return _createToken.apply(this, arguments);
      }

      return createToken;
    }(),

    /**
     * TODO: Should this throw an error if the font is invalid?
     * Allows users of the component to specify the font that will be used
     * inside the text fields generated by Stripe. Does NOT affect the font
     * used by the label, hint, or error messages. These fonts can/should be
     * set at the app level along with all of the other UI fonts.
     *
     * @param   {string} font The name of a Google font, or a URL to a valid font
     * @returns {object}      An object in the form required by `Stripe.elements()`
     */
    genFont: function genFont(font) {
      var cssSrc = this.isURL(font) ? font : "https://fonts.googleapis.com/css?family=".concat(encodeURI(font), ":400");
      return {
        fonts: [{
          cssSrc: cssSrc
        }]
      };
    },

    /**
     * Generates the HTML element to which the Stripe element will attach
     * itself. All that is needed is a <div> with a known ID. This <div>
     * gets replaced by Stripe with an IFrame with their custom inputs.
     * see: {@link|https://stripe.com/docs/stripe-js/reference#element-mount}
     */
    genInput: function genInput() {
      return this.$createElement('div', {
        attrs: {
          id: this.computedId
        }
      });
    },

    /**
     * Maintains the ability for users of the component to control the
     * loading/progress indicator of the component, but also shows the
     * progress bar while the Stripe library is being loaded.
     */
    genProgress: function genProgress() {
      if (this.loading === false && this.isReady) return null;
      return this.$slots.progress || this.$createElement(_lib.VProgressLinear, {
        props: {
          absolute: true,
          color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading || 'primary',
          height: this.loaderHeight,
          indeterminate: true
        }
      });
    },

    /**
     * Generate styles for Stripe elements
     *
     * @param   {string} font
     */
    genStyle: function genStyle(font, theme) {
      var dark = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return {
        base: {
          color: dark ? '#ffffff' : '#000000',
          fontFamily: "'".concat(font, "', sans-serif"),
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          iconColor: dark ? '#eceff1' : '#455a64',
          '::placeholder': {
            color: dark ? 'rgb(255,255,255,0.7)' : 'rgb(0,0,0,0.54)'
          },
          ':focus::placeholder': {
            color: dark ? 'rgb(255,255,255,0.7)' : 'rgb(0,0,0,0.54)'
          }
        },
        invalid: {
          color: theme.error,
          iconColor: theme.error
        }
      };
    },

    /**
     * Loosely validates a URL
     * Based on: {@link|https://github.com/segmentio/is-url}
     *
     * @param   {string}  url The string to be tested
     * @returns {boolean}     True if the url string passes the test
     */
    isURL: function isURL(url) {
      var protocolAndDomainRegex = /^(?:\w+:)?\/\/(\S+)$/;
      var localhostDomainRegex = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/;
      var nonLocalhostDomainRegex = /^[^\s.]+\.\S{2,}$/;
      if (typeof url !== 'string') return false;
      var match = url.match(protocolAndDomainRegex);
      if (!match) return false;
      var everythingAfterProtocol = match[1];
      if (!everythingAfterProtocol) return false;

      if (localhostDomainRegex.test(everythingAfterProtocol) || nonLocalhostDomainRegex.test(everythingAfterProtocol)) {
        return true;
      }

      return false;
    },
    loadStripe: function loadStripe() {
      // is Stripe already available?
      if (typeof Stripe !== 'undefined') return Promise.resolve(true); // is the external script loader available?

      if (typeof this.$loadScript === 'undefined') {
        // no
        throw new Error('[VStripeInput Error]: Stripe is not available and could not be loaded. Please make sure that you have installed and configured all of the necessary dependencies to use this component.');
      } else {
        // yes, let's try to get Stripe
        return this.$loadScript('https://js.stripe.com/v3/').then(function () {
          return true;
        })["catch"](function (err) {
          throw new Error('[VStripeInput Error] There was a problem loading Stripe: ' + err.message);
        });
      }
    },
    onCardBlur: function onCardBlur(e) {
      this.isFocused = false;
      this.$emit('blur', e);
    },
    onCardChange: function onCardChange(e) {
      if (e.error) {
        // handle card errors
        e.error.message && this.errorBucket.push(e.error.message);
      }

      if (e.complete) {
        // handle card input is complete
        this.errorBucket = [];
      }

      if (e.empty) {
        this.lazyValue = !e.empty;
      }
    },
    onCardFocus: function onCardFocus(e) {
      this.isFocused = true;
      this.$emit('focus', true); // Do we want to emit? Is this the right value to emit?
    },
    onCardReady: function onCardReady(e) {
      this.isReady = true;
      this.autofocus && this.card !== null && this.card.focus();
      this.$emit('ready', e);
    },
    setLabelWidth: function setLabelWidth() {
      if (!this.outlined) return;
      this.labelWidth = this.$refs.label.offsetWidth * 0.75 + 6;
    },
    verifyCardInfo: function () {
      var _verifyCardInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function verifyCardInfo() {
        return _verifyCardInfo.apply(this, arguments);
      }

      return verifyCardInfo;
    }()
  } //  as ComponentOptions<
  //   Vue,
  //   DefaultData<Vue>,
  //   DefaultMethods<Vue>,
  //   DefaultComputed,
  //   PropsDefinition<Record<string, any>>,
  //   Record<string, any>
  // >

});

exports["default"] = _default2;
//# sourceMappingURL=VStripeInput.js.map