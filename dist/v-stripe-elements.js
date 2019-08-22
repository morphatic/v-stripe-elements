(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("vuetify"));
	else if(typeof define === 'function' && define.amd)
		define(["vue", "vuetify"], factory);
	else if(typeof exports === 'object')
		exports["VStripeElements"] = factory(require("vue"), require("vuetify"));
	else
		root["VStripeElements"] = factory(root["Vue"], root["Vuetify"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_vue__, __WEBPACK_EXTERNAL_MODULE_vuetify_lib__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/VStripeCard.sass":
/*!******************************!*\
  !*** ./src/VStripeCard.sass ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/VStripeCard.ts":
/*!****************************!*\
  !*** ./src/VStripeCard.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VStripeCard_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VStripeCard.sass */ "./src/VStripeCard.sass");
/* harmony import */ var _VStripeCard_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_VStripeCard_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuetify_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuetify/lib */ "vuetify/lib");
/* harmony import */ var vuetify_lib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuetify_lib__WEBPACK_IMPORTED_MODULE_2__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}; // Imported Types
/// <reference path="../node_modules/vuetify/src/globals.d.ts" />


 // import { VuetifyObject } from 'vuetify/types' // !this causes type errors if imported
// Styles

 // Extensions and Components
// @ts-ignore

 // Create Base Mixins and Define Custom Properties

var base = vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
  mixins: [vuetify_lib__WEBPACK_IMPORTED_MODULE_2__["VTextField"]]
}); // Extend VTextField to define the VStripeCard component

/* harmony default export */ __webpack_exports__["default"] = (base.extend().extend({
  name: 'v-stripe-card',
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
      return __assign({}, vuetify_lib__WEBPACK_IMPORTED_MODULE_2__["VTextField"].options.computed.classes.call(this), {
        'v-stripe-card': true
      });
    }
  },
  watch: {
    isDark: function isDark(val, oldVal) {
      // if the theme changes and a card has already been initialized
      if (val !== oldVal && this.card !== null) {
        // generate styles to match the theme
        var style = this.genStyle(this.font, this.$vuetify.theme.currentTheme, this.$vuetify.theme.dark); // then update the card

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
    var _this = this; // Handle tasks NOT related to actual DOM rendering or manipulation


    var cardProps = {
      classes: {
        base: 'VStripeCard',
        complete: 'VStripeCard--complete',
        empty: 'VStripeCard--empty',
        focus: 'VStripeCard--focus',
        invalid: 'VStripeCard--invalid',
        webkitAutofill: 'VStripeCard--webkit-autofill'
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

        _this.card.mount("#" + _this.computedId);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  methods: {
    clearableCallback: function clearableCallback() {
      this.card !== null && this.card.clear();
      vuetify_lib__WEBPACK_IMPORTED_MODULE_2__["VTextField"].options.methods.clearableCallback.call(this);
    },

    /**
     * Converts the collected payment information into a single-use token
     * that can safely be passed to your backend API server where a
     * payment request can be processed.
     * See {@link|https://stripe.com/docs/stripe-js/reference#stripe-create-token}
     */
    createToken: function createToken() {
      return __awaiter(this, void 0, void 0, function () {
        var _a, token, error;

        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              if (this.stripe === null || this.card === null) return [2
              /*return*/
              ];
              return [4
              /*yield*/
              , this.stripe.createToken(this.card, this.tokenOptions)];

            case 1:
              _a = _b.sent(), token = _a.token, error = _a.error;

              if (!error) {// do something
              } else {
                this.$emit('input', token);
              }

              return [2
              /*return*/
              ];
          }
        });
      });
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
    genFont: function genFont(font) {
      var cssSrc = this.isURL(font) ? font : "https://fonts.googleapis.com/css?family=" + encodeURI(font) + ":400";
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
      return this.$slots.progress || this.$createElement(vuetify_lib__WEBPACK_IMPORTED_MODULE_2__["VProgressLinear"], {
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
    genStyle: function genStyle(font, theme, dark) {
      if (dark === void 0) {
        dark = false;
      }

      return {
        base: {
          color: dark ? '#ffffff' : '#000000',
          fontFamily: "'" + font + "', sans-serif",
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
        throw new Error('[VStripeCard Error]: Stripe is not available and could not be loaded. Please make sure that you have installed and configured all of the necessary dependencies to use this component.');
      } else {
        // yes, let's try to get Stripe
        return this.$loadScript('https://js.stripe.com/v3/').then(function () {
          return true;
        })["catch"](function (err) {
          throw new Error('[VStripeCard Error] There was a problem loading Stripe: ' + err.message);
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
    verifyCardInfo: function verifyCardInfo() {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [2
          /*return*/
          ];
        });
      });
    }
  } //  as ComponentOptions<
  //   Vue,
  //   DefaultData<Vue>,
  //   DefaultMethods<Vue>,
  //   DefaultComputed,
  //   PropsDefinition<Record<string, any>>,
  //   Record<string, any>
  // >

}));

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: VStripeCard, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VStripeCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VStripeCard */ "./src/VStripeCard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VStripeCard", function() { return _VStripeCard__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VStripeCard__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "vue":
/*!******************************************************************************!*\
  !*** external {"commonjs":"vue","commonjs2":"vue","amd":"vue","root":"Vue"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vue__;

/***/ }),

/***/ "vuetify/lib":
/*!**********************************************************************************************!*\
  !*** external {"commonjs":"vuetify","commonjs2":"vuetify","amd":"vuetify","root":"Vuetify"} ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vuetify_lib__;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=v-stripe-elements.js.map