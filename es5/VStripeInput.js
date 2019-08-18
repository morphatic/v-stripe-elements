"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("../src/VStripeInput.sass");

var _lib = require("vuetify/lib");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { VNode, CreateElement } from 'vue'
// Vuetify Types
// import 'vuetify/types'
// import { VTextField, VLabel } from 'vuetify/src/components'
// Directives
// import ripple from 'vuetify/src/directives/ripple'
// Utilities
// import mixins from 'vuetify/src/util/mixins'
var VStripeInput = {
  name: 'v-stripe-input',
  "extends": _lib.VTextField,
  // directives: { ripple },
  inheritAttrs: false,
  props: {
    apiKey: {
      type: String,
      required: true
    },
    font: {
      type: String,
      "default": 'Roboto'
    },
    zip: {
      type: String,
      "default": ''
    },
    // appendOuterIcon: String,
    autofocus: Boolean
  },
  data: function data() {
    return {
      card: null,
      cardError: null,
      elements: null,
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
  // watch: {},
  created: function created() {},
  mounted: function mounted() {
    // Handle tasks NOT related to actual DOM rendering or manipulation
    var self = this;
    var style = this.genStyle(this.font, this.$vuetify.theme.currentTheme, this.$vuetify.theme.dark);
    var classes = {
      focus: 'focus',
      empty: 'empty'
    };
    var cardProps = {
      style: style,
      classes: classes,
      value: {
        postalCode: this.zip,
        label: 'x'
      }
    };
    self.loading = true;
    this.loadStripe() // initialize the Stripe.js object
    // @ts-ignore
    .then(function () {
      return Stripe(self.apiKey);
    }) // eslint-disable-line no-undef
    // then create a Stripe elements generator
    .then(function (stripe) {
      return stripe.elements(self.genFont(self.font));
    }) // then create a card element
    .then(function (elements) {
      return elements.create('card', cardProps);
    }) // then setup card events and return the card
    .then(function (card) {
      card.on('blur', self.onBlur);
      card.on('focus', self.onFocus);
      card.on('ready', function (e) {
        self.autofocus && card.focus();
        self.$emit('ready', e);
      });
      card.on('change', function (e) {
        e.error && self.errorBucket.push(e.error.message);
        e.complete && (self.errorBucket = []); // won't work if there are external rules
      });
      return card;
    }).then(function (card) {
      card.mount("#".concat(self.computedId)); // console.log(card)

      self.card = card;
      self.loading = false;
    })["catch"](function (err) {
      console.log(err);
    });
  },
  methods: {
    genFont: function genFont(font) {
      return {
        fonts: [{
          cssSrc: "https://fonts.googleapis.com/css?family=".concat(encodeURI(font), ":400")
        }]
      };
    },
    // see: https://stripe.com/docs/stripe-js/reference#element-mount
    // All we need is a <div> with a known ID. This <div> will get
    // replaced by Stripe with an IFrame with their custom inputs.
    genInput: function genInput() {
      return this.$createElement('div', {
        attrs: {
          id: this.computedId
        }
      });
    },
    genStyle: function genStyle(font, theme) {
      var dark = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return {
        base: {
          color: dark ? '#ffffff' : '#000000',
          fontFamily: "'".concat(font, "', sans-serif"),
          fontSize: '16px',
          fontSmoothing: 'antialiased',
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
    onBlur: function onBlur(e) {
      this.isFocused = false;
      e && this.$emit('blur', e);
    },
    onClick: function onClick() {
      if (this.isFocused || this.disabled) return;
      this.card.focus();
    },
    onFocus: function onFocus(e) {
      if (!this.isFocused) {
        this.isFocused = true;
        e && this.$emit('focus', e);
      }
    }
  }
};
var _default = VStripeInput;
exports["default"] = _default;
//# sourceMappingURL=VStripeInput.js.map