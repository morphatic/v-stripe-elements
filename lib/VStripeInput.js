// Styles
import "../src/VStripeInput.sass"; // Extensions and Components

import { VTextField } from 'vuetify/lib'; // import { VNode, CreateElement } from 'vue'
// Vuetify Types
// import 'vuetify/types'
// import { VTextField, VLabel } from 'vuetify/src/components'
// Directives
// import ripple from 'vuetify/src/directives/ripple'
// Utilities
// import mixins from 'vuetify/src/util/mixins'

const VStripeInput = {
  name: 'v-stripe-input',
  extends: VTextField,
  // directives: { ripple },
  inheritAttrs: false,
  props: {
    apiKey: {
      type: String,
      required: true
    },
    font: {
      type: String,
      default: 'Roboto'
    },
    zip: {
      type: String,
      default: ''
    },
    // appendOuterIcon: String,
    autofocus: Boolean
  },
  data: () => ({
    card: null,
    cardError: null,
    elements: null,
    okToSubmit: false,
    stripe: null
  }),
  computed: {
    classes() {
      return { ...VTextField.options.computed.classes.call(this),
        'v-stripe-input': true
      };
    }

  },

  // watch: {},
  created() {},

  mounted() {
    // Handle tasks NOT related to actual DOM rendering or manipulation
    const self = this;
    const style = this.genStyle(this.font, this.$vuetify.theme.currentTheme, this.$vuetify.theme.dark);
    const classes = {
      focus: 'focus',
      empty: 'empty'
    };
    const cardProps = {
      style,
      classes,
      value: {
        postalCode: this.zip,
        label: 'x'
      }
    };
    self.loading = true;
    this.loadStripe() // initialize the Stripe.js object
    // @ts-ignore
    .then(() => Stripe(self.apiKey)) // eslint-disable-line no-undef
    // then create a Stripe elements generator
    .then(stripe => stripe.elements(self.genFont(self.font))) // then create a card element
    .then(elements => elements.create('card', cardProps)) // then setup card events and return the card
    .then(card => {
      card.on('blur', self.onBlur);
      card.on('focus', self.onFocus);
      card.on('ready', e => {
        self.autofocus && card.focus();
        self.$emit('ready', e);
      });
      card.on('change', e => {
        e.error && self.errorBucket.push(e.error.message);
        e.complete && (self.errorBucket = []); // won't work if there are external rules
      });
      return card;
    }).then(card => {
      card.mount(`#${self.computedId}`); // console.log(card)

      self.card = card;
      self.loading = false;
    }).catch(err => {
      console.log(err);
    });
  },

  methods: {
    genFont: font => ({
      fonts: [{
        cssSrc: `https://fonts.googleapis.com/css?family=${encodeURI(font)}:400`
      }]
    }),

    // see: https://stripe.com/docs/stripe-js/reference#element-mount
    // All we need is a <div> with a known ID. This <div> will get
    // replaced by Stripe with an IFrame with their custom inputs.
    genInput() {
      return this.$createElement('div', {
        attrs: {
          id: this.computedId
        }
      });
    },

    genStyle: (font, theme, dark = false) => ({
      base: {
        color: dark ? '#ffffff' : '#000000',
        fontFamily: `'${font}', sans-serif`,
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
    }),

    loadStripe() {
      // is Stripe already available?
      if (typeof Stripe !== 'undefined') return Promise.resolve(true); // is the external script loader available?

      if (typeof this.$loadScript === 'undefined') {
        // no
        throw new Error('[VStripeInput Error]: Stripe is not available and could not be loaded. Please make sure that you have installed and configured all of the necessary dependencies to use this component.');
      } else {
        // yes, let's try to get Stripe
        return this.$loadScript('https://js.stripe.com/v3/').then(() => true).catch(err => {
          throw new Error('[VStripeInput Error] There was a problem loading Stripe: ' + err.message);
        });
      }
    },

    onBlur(e) {
      this.isFocused = false;
      e && this.$emit('blur', e);
    },

    onClick() {
      if (this.isFocused || this.disabled) return;
      this.card.focus();
    },

    onFocus(e) {
      if (!this.isFocused) {
        this.isFocused = true;
        e && this.$emit('focus', e);
      }
    }

  }
};
export default VStripeInput;
//# sourceMappingURL=VStripeInput.js.map