"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

require("../src/VStripeCard.sass");

var _lib = require("vuetify/lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Create Base Mixins and Define Custom Properties
var base = _vue["default"].extend({
  mixins: [_lib.VTextField]
}); // Extend VTextField to define the VStripeCard component


var _default2 = base.extend().extend({
  name: 'v-stripe-card',
  props: {
    apiKey: {
      type: String,
      required: true
    },
    create: {
      type: String,
      "default": 'token'
    },
    customStyle: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    fontName: {
      type: String,
      "default": 'Roboto'
    },
    fontUrl: {
      type: String,
      "default": ''
    },
    hideIcon: Boolean,
    hidePostalCode: Boolean,
    iconStyle: {
      type: String,
      "default": 'default'
    },
    options: {
      type: Object,

      /**
       * TODO: Document available options in README.md
       * These can be any and all available options for creating
       * either a token or a source.
       */
      "default": function _default() {
        return {};
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
        'v-stripe-card': true
      });
    },
    theme: function theme() {
      return this.$vuetify.theme.currentTheme;
    }
  },
  watch: {
    isDark: function isDark(val, oldVal) {
      // if the theme changes and a card has already been initialized
      if (val !== oldVal && this.card !== null) {
        // extract key variables from the context
        var isDark = this.isDark,
            fontName = this.fontName,
            theme = this.theme,
            customStyle = this.customStyle; // generate styles to match the theme

        var style = this.genStyle(customStyle, fontName, isDark, theme); // then update the card

        this.card.update({
          style: style
        });
      }
    },
    isDisabled: function isDisabled(val, oldVal) {
      // if the disabled status changes and the card has already been initialized
      if (val !== oldVal && this.card !== null) {
        // update its disabled status
        this.card.update({
          disabled: val
        });
      }
    }
  },
  mounted: function mounted() {
    // make sure the API key is set correctly
    this.checkAPIKey(this.apiKey); // make sure the Stripe.js library is loaded

    this.loadStripe();
  },
  methods: {
    /**
     * Checks the API key and warns the user if they are using a secret
     * key (instead of a public key), or if they are using a test key.
     *
     * @param {string} key An API key
     */
    checkAPIKey: function checkAPIKey(key) {
      // if they are using a secret key
      if (/^sk_/.test(key)) {
        console.error('[VStripeCard Error] It looks like you are using a SECRET API key! You should be using your PUBLIC API key. If you have mistakenly made your secret key publicly available on the web, you should strongly consider rolling your API keys. See: https://stripe.com/docs/keys#keeping-your-keys-safe');
      } // if they are using a test key


      if (/^pk_test/.test(key)) {
        console.warn('[VStripeCard Warning] Your `v-stripe-card` instance was initialized with a TEST key. This is correct and appropriate for development and/or testing environments. For production environments, please use your LIVE key. See https://stripe.com/docs/keys for more information.');
      }
    },
    clearableCallback: function clearableCallback() {
      this.card !== null && this.card.clear();

      _lib.VTextField.options.methods.clearableCallback.call(this);
    },

    /**
     * Instantiates a Stripe card element and mounts it in the DOM.
     */
    genCard: function genCard() {
      // extract props from the context
      var disabled = this.disabled,
          fontName = this.fontName,
          fontUrl = this.fontUrl,
          hideIcon = this.hideIcon,
          hidePostalCode = this.hidePostalCode,
          iconStyle = this.iconStyle,
          isDark = this.isDark,
          customStyle = this.customStyle,
          theme = this.theme,
          zip = this.zip; // use them to generate the options we'll need to generate the Stripe and card instances

      var style = this.genStyle(customStyle, fontName, isDark, theme);
      var cardProps = this.genCardProps({
        disabled: disabled,
        hideIcon: hideIcon,
        hidePostalCode: hidePostalCode,
        iconStyle: iconStyle,
        style: style,
        zip: zip
      }); // initialize Stripe

      this.stripe = Stripe(this.apiKey); // eslint-disable-line no-undef
      // create an Elements generator

      var font = fontUrl || fontName;
      this.elements = this.stripe.elements(this.genFont(font)); // then initialize the card

      this.card = this.elements.create('card', cardProps); // setup card event handlers and mount the card

      if (this.card !== null) {
        this.card.on('blur', this.onCardBlur);
        this.card.on('change', this.onCardChange);
        this.card.on('focus', this.onCardFocus);
        this.card.on('ready', this.onCardReady);
        this.card.mount("#".concat(this.computedId));
      }
    },

    /**
     * Generates a well-formed object with all of the values necessary to
     * correctly create a `stripe.elements.Element` card object.
     *
     * @param   {object}                          params                An object with all data necessary to generate valid card props
     * @param   {boolean}                         params.disabled       Is the input disabled?
     * @param   {boolean}                         params.hideIcon       Should the card icon be hidden?
     * @param   {boolean}                         params.hidePostalCode Should the postal code field be hidden?
     * @param   {string}                          params.iconStyle      'solid' or 'default'
     * @param   {ElementStyles}                   params.style          Output from `genStyle()`
     * @param   {string}                          params.zip            Zip code to be pre-filled, if known
     * @returns {stripe.elements.ElementsOptions}                       Object to be fed to the `stripe.create('card')` function
     */
    genCardProps: function genCardProps() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$disabled = _ref.disabled,
          disabled = _ref$disabled === void 0 ? false : _ref$disabled,
          _ref$hideIcon = _ref.hideIcon,
          hideIcon = _ref$hideIcon === void 0 ? false : _ref$hideIcon,
          _ref$hidePostalCode = _ref.hidePostalCode,
          hidePostalCode = _ref$hidePostalCode === void 0 ? false : _ref$hidePostalCode,
          _ref$iconStyle = _ref.iconStyle,
          iconStyle = _ref$iconStyle === void 0 ? 'default' : _ref$iconStyle,
          _ref$style = _ref.style,
          style = _ref$style === void 0 ? {} : _ref$style,
          _ref$zip = _ref.zip,
          zip = _ref$zip === void 0 ? '' : _ref$zip;

      var cardProps = {
        classes: {
          base: 'VStripeCard',
          complete: 'VStripeCard--complete',
          empty: 'VStripeCard--empty',
          focus: 'VStripeCard--focus',
          invalid: 'VStripeCard--invalid',
          webkitAutofill: 'VStripeCard--webkit-autofill'
        },
        disabled: disabled,
        hideIcon: hideIcon,
        hidePostalCode: hidePostalCode,
        iconStyle: iconStyle,
        style: style
      };
      zip && (cardProps.value = {
        postalCode: zip
      });
      return cardProps;
    },

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
    genFont: function genFont() {
      var font = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Roboto';
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
          id: this.computedId,
          tabindex: -1
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
    genStyle: function genStyle(customStyle, fontName, isDark, theme) {
      var defaults = {
        base: {
          color: isDark ? '#ffffff' : '#000000',
          fontFamily: "'".concat(fontName, "', sans-serif"),
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          iconColor: isDark ? '#eceff1' : '#455a64',
          '::placeholder': {
            color: isDark ? 'rgb(255,255,255,0.7)' : 'rgb(0,0,0,0.54)'
          }
        },
        invalid: {
          color: theme.error || '#ff5252',
          iconColor: theme.error || '#ff5252'
        }
      };
      return (0, _deepmerge["default"])(defaults, customStyle);
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

    /**
     * Check to see if the Stripe.js library has been loaded into the
     * browser. If it has not, try to load it. If Stripe cannot be
     * loaded or there was a problem with loading, an error is thrown.
     *
     * @throws  {Error}            Could not load Stripe because `vue-plugin-load-script` is not available
     * @throws  {Error}            Could not load Stripe because of a network (or other) error
     */
    loadStripe: function loadStripe() {
      var _this = this;

      // Is Stripe already loaded?
      if (typeof Stripe === 'function') {
        // Yes. Generate the card.
        this.genCard();
      } else {
        // No. Set the Stripe URL.
        var src = 'https://js.stripe.com/v3/'; // Is it already being loaded by another component?

        if (document.querySelector("script[src=\"".concat(src, "\"]"))) {
          // Yes, it's being loaded, so listen for it.
          this.$root.$once('stripe-loaded', function () {
            // instantiate the card
            _this.genCard();
          });
        } else {
          // No. Is the script loader installed?
          if (typeof this.$loadScript === 'undefined') {
            // No.
            this.loading = false;
            this.errorBucket.push('Stripe could not be loaded');
            throw new Error('[VStripeCard Error]: Stripe is not available and could not be loaded. Please make sure that you have installed and configured all of the necessary dependencies to use this component.');
          } else {
            // Yes, so try to load it.
            this.$loadScript(src).then(function () {
              // Let other potential components know...
              _this.$root.$emit('stripe-loaded'); // and generate the card


              _this.genCard();
            })["catch"](function (error) {
              _this.loading = false;

              _this.errorBucket.push('Error loading stripe');

              throw new Error('[VStripeCard Error] There was a problem loading Stripe: ' + error.message);
            });
          }
        }
      }
    },

    /**
     * Handles card blur events. Propagates (emits) a blur event to
     * allow other components to register event handlers that can
     * respond to the card being blurred.
     *
     * @param {ElementChangeResponse} e Event data from the card element
     */
    onCardBlur: function onCardBlur(e) {
      this.isFocused = false; // if we have enough info, process the card

      if (this.okToSubmit) {
        this.processCard();
      }

      this.$emit('blur', e);
    },

    /**
     * Handles card change events. Clears or sets errors in the
     * `errorBucket`. If the card is empty, sets `lazyValue` to false.
     *
     * @param {ElementChangeResponse} e Event data from the card element
     */
    onCardChange: function onCardChange(e) {
      if (e.error) {
        // handle card errors
        this.okToSubmit = false;
        e.error.message && this.errorBucket.push(e.error.message);
      }

      if (e.complete) {
        // handle card input is complete
        this.okToSubmit = true;
        this.errorBucket = [];
      }

      if (e.empty) {
        this.okToSubmit = false;
        this.lazyValue = !e.empty;
      }
    },

    /**
     * TODO: Should this function emit? Does it emit the right value?
     * Handles card focus events. Propagates (emits) a focus event to
     * allow other components to register event handlers that can
     * respond to the card being focused.
     *
     * @param {ElementChangeResponse} e Event data from the card element
     */
    onCardFocus: function onCardFocus(e) {
      this.isFocused = true;
      this.$emit('focus', true);
    },

    /**
     * Handles card initialization events. Propagates (emits) a ready event to
     * allow other components to register event handlers that can
     * respond to the card being ready. Will also focus the card input
     * if `autofocus` is true.
     *
     * @param {ElementChangeResponse} e Event data from the card element
     */
    onCardReady: function onCardReady(e) {
      this.isReady = true;
      this.autofocus && this.card !== null && this.card.focus();
      this.$emit('ready', e);
    },

    /**
     * Converts the collected payment information into a single-use token
     * or a multi-use source that can safely be passed to your backend
     * API server where a payment request can be processed.
     *
     * See {@link|https://stripe.com/docs/stripe-js/reference#stripe-create-token}
     */
    processCard: function () {
      var _processCard = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref2, token, error, _ref3, source, _error;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.stripe && this.card)) {
                  _context.next = 16;
                  break;
                }

                if (!(this.create === 'token')) {
                  _context.next = 10;
                  break;
                }

                _context.next = 4;
                return this.stripe.createToken(this.card, this.options);

              case 4:
                _ref2 = _context.sent;
                token = _ref2.token;
                error = _ref2.error;

                if (!error) {
                  this.errorBucket = [];
                  this.$emit('input', token);
                } else {
                  // handle error
                  error.message && this.errorBucket.push(error.message);
                }

                _context.next = 16;
                break;

              case 10:
                _context.next = 12;
                return this.stripe.createSource(this.card, this.options);

              case 12:
                _ref3 = _context.sent;
                source = _ref3.source;
                _error = _ref3.error;

                if (!_error) {
                  this.errorBucket = [];
                  this.$emit('input', source);
                } else {
                  // handle error
                  _error.message && this.errorBucket.push(_error.message);
                }

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function processCard() {
        return _processCard.apply(this, arguments);
      }

      return processCard;
    }()
  }
});

exports["default"] = _default2;
//# sourceMappingURL=VStripeCard.js.map