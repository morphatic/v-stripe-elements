// Imported Types
/// <reference path="../node_modules/vuetify/src/globals.d.ts" />
import Vue, { VNode } from 'vue'
import { VuetifyThemeVariant } from 'vuetify/types/services/theme'
// import { VuetifyObject } from 'vuetify/types' // !this causes type errors if imported

// Styles
import './VStripeCard.sass'

// Extensions and Components
// @ts-ignore
import { VProgressLinear, VTextField } from 'vuetify/lib'

// Create Base Mixins and Define Custom Properties
const base = Vue.extend({ mixins: [VTextField] })
interface options extends InstanceType<typeof base> {
  /**
   * Props unique to VStripeCard
   */
  $loadScript: (url: string) => Promise<boolean>
  onCardBlur: stripe.elements.handler
  onCardChange: stripe.elements.handler
  onCardFocus: stripe.elements.handler
  onCardReady: stripe.elements.handler
  /**
   * Props that **should** have been inherited from VTextField
   * TODO: Figure out why these types aren't being recognized automatically
   */
  autofocus: boolean
  color: string|null
  computedId: string
  disabled: boolean
  errorBucket: string[]
  iconStyle: 'default'|'solid'
  isFocused: boolean
  labelWidth: number|string
  lazyValue: any
  loaderHeight: number|string
  loading: string|boolean
  outlined: boolean
  $vuetify: any // VuetifyObject // importing this type from Vuetify causes errors for some reason
}

// Extend VTextField to define the VStripeCard component
export default base.extend<options>().extend({
  name: 'v-stripe-card',
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    font: {
      type: String,
      default: 'Roboto',
    },
    hideIcon: Boolean,
    hidePostalCode: Boolean,
    iconStyle: {
      type: String,
      default: 'default',
    },
    tokenOptions: {
      type: Object,
      default: () => ({
        name: '',
        address_line1: '',
        address_line2: '',
        address_city: '',
        address_state: '',
        address_zip: '',
        address_country: '',
      }),
    },
    zip: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    card: null as stripe.elements.Element | null,
    elements: null as stripe.elements.Elements | null,
    isReady: false,
    okToSubmit: false,
    stripe: null as stripe.Stripe | null,
  }),
  computed: {
    classes (): object {
      return {
        ...VTextField.options.computed.classes.call(this),
        'v-stripe-card': true,
      }
    },
  },
  watch: {
    isDark (val: boolean, oldVal: boolean) {
      // if the theme changes and a card has already been initialized
      if (val !== oldVal && this.card !== null) {
        // generate styles to match the theme
        const style = this.genStyle(
          this.font,
          this.$vuetify.theme.currentTheme,
          this.$vuetify.theme.dark
        )
        // then update the card
        this.card.update({ style })
      }
    },
    isDisabled (val: boolean, oldVal: boolean) {
      // if the disabled status changes and the card has already been initialized
      if (val !== oldVal && this.card !== null) {
        // update its disabled status
        this.card.update({ disabled: val })
      }
    },
  },
  mounted () {
    // Handle tasks NOT related to actual DOM rendering or manipulation
    const cardProps: stripe.elements.ElementsOptions = {
      classes: {
        base: 'VStripeCard',
        complete: 'VStripeCard--complete',
        empty: 'VStripeCard--empty',
        focus: 'VStripeCard--focus',
        invalid: 'VStripeCard--invalid',
        webkitAutofill: 'VStripeCard--webkit-autofill',
      },
      disabled: this.disabled,
      hideIcon: this.hideIcon,
      hidePostalCode: this.hidePostalCode,
      iconStyle: this.iconStyle,
      style: this.genStyle(this.font, this.$vuetify.theme.currentTheme, this.$vuetify.theme.dark),
    }
    this.zip && (cardProps.value = { postalCode: this.zip })
    this.loadStripe()
      // initialize the Stripe.js object
      .then(() => { this.stripe = Stripe(this.apiKey) }) // eslint-disable-line no-undef
      // then create a Stripe elements generator
      .then(() => { this.elements = this.stripe && this.stripe.elements(this.genFont(this.font)) })
      // then create a card element, setup card events, and mount the card
      .then(() => {
        this.card = this.elements && this.elements.create('card', cardProps)
        if (this.card !== null) {
          this.card.on('blur', this.onCardBlur)
          this.card.on('change', this.onCardChange)
          this.card.on('focus', this.onCardFocus)
          this.card.on('ready', this.onCardReady)
          this.card.mount(`#${this.computedId}`)
        }
      })
      .catch((err: Error) => { console.log(err) })
  },
  methods: {
    clearableCallback () {
      this.card !== null && this.card.clear()
      VTextField.options.methods.clearableCallback.call(this)
    },
    /**
     * Converts the collected payment information into a single-use token
     * that can safely be passed to your backend API server where a
     * payment request can be processed.
     * See {@link|https://stripe.com/docs/stripe-js/reference#stripe-create-token}
     */
    async createToken () {
      if (this.stripe === null || this.card === null) return
      const { token, error } = await this.stripe.createToken(
        this.card,
        this.tokenOptions
      )
      if (!error) {
        // do something
      } else {
        this.$emit('input', token)
      }
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
    genFont (font: string): stripe.elements.ElementsCreateOptions {
      const cssSrc = this.isURL(font)
        ? font
        : `https://fonts.googleapis.com/css?family=${encodeURI(font)}:400`
      return { fonts: [{ cssSrc }] }
    },
    /**
     * Generates the HTML element to which the Stripe element will attach
     * itself. All that is needed is a <div> with a known ID. This <div>
     * gets replaced by Stripe with an IFrame with their custom inputs.
     * see: {@link|https://stripe.com/docs/stripe-js/reference#element-mount}
     */
    genInput (): VNode {
      return this.$createElement('div', { attrs: { id: this.computedId } })
    },
    /**
     * Maintains the ability for users of the component to control the
     * loading/progress indicator of the component, but also shows the
     * progress bar while the Stripe library is being loaded.
     */
    genProgress (): VNode | VNode[] | null {
      if (this.loading === false && this.isReady) return null
      return this.$slots.progress || this.$createElement(VProgressLinear, {
        props: {
          absolute: true,
          color: (this.loading === true || this.loading === '')
            ? (this.color || 'primary')
            : (this.loading || 'primary'),
          height: this.loaderHeight,
          indeterminate: true,
        },
      })
    },
    /**
     * Generate styles for Stripe elements
     *
     * @param   {string} font
     */
    genStyle: (font: string, theme: VuetifyThemeVariant, dark = false): object => ({
      base: {
        color: dark ? '#ffffff' : '#000000',
        fontFamily: `'${font}', sans-serif`,
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        iconColor: dark ? '#eceff1' : '#455a64',
        '::placeholder': {
          color: dark ? 'rgb(255,255,255,0.7)' : 'rgb(0,0,0,0.54)',
        },
        ':focus::placeholder': {
          color: dark ? 'rgb(255,255,255,0.7)' : 'rgb(0,0,0,0.54)',
        },
      },
      invalid: {
        color: theme.error,
        iconColor: theme.error,
      },
    }),
    /**
     * Loosely validates a URL
     * Based on: {@link|https://github.com/segmentio/is-url}
     *
     * @param   {string}  url The string to be tested
     * @returns {boolean}     True if the url string passes the test
     */
    isURL: (url: string): boolean => {
      const protocolAndDomainRegex = /^(?:\w+:)?\/\/(\S+)$/
      const localhostDomainRegex = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/
      const nonLocalhostDomainRegex = /^[^\s.]+\.\S{2,}$/
      if (typeof url !== 'string') return false
      const match = url.match(protocolAndDomainRegex)
      if (!match) return false
      const everythingAfterProtocol = match[1]
      if (!everythingAfterProtocol) return false
      if (
        localhostDomainRegex.test(everythingAfterProtocol) ||
        nonLocalhostDomainRegex.test(everythingAfterProtocol)
      ) {
        return true
      }
      return false
    },
    loadStripe (): Promise<boolean> {
      // is Stripe already available?
      if (typeof Stripe !== 'undefined') return Promise.resolve(true)
      // is the external script loader available?
      if (typeof this.$loadScript === 'undefined') {
        // no
        throw new Error('[VStripeCard Error]: Stripe is not available and could not be loaded. Please make sure that you have installed and configured all of the necessary dependencies to use this component.')
      } else {
        // yes, let's try to get Stripe
        return this.$loadScript('https://js.stripe.com/v3/')
          .then(() => true)
          .catch((err: Error) => {
            throw new Error('[VStripeCard Error] There was a problem loading Stripe: ' + err.message)
          })
      }
    },
    onCardBlur (e: stripe.elements.ElementChangeResponse) {
      this.isFocused = false
      this.$emit('blur', e)
    },
    onCardChange (e: stripe.elements.ElementChangeResponse) {
      if (e.error) {
        // handle card errors
        e.error.message && this.errorBucket.push(e.error.message)
      }
      if (e.complete) {
        // handle card input is complete
        this.errorBucket = []
      }
      if (e.empty) {
        this.lazyValue = !e.empty
      }
    },
    onCardFocus (e: stripe.elements.ElementChangeResponse) {
      this.isFocused = true
      this.$emit('focus', true) // Do we want to emit? Is this the right value to emit?
    },
    onCardReady (e: stripe.elements.ElementChangeResponse) {
      this.isReady = true
      this.autofocus && this.card !== null && this.card.focus()
      this.$emit('ready', e)
    },
    setLabelWidth () {
      if (!this.outlined) return
      this.labelWidth = (this.$refs.label as HTMLElement).offsetWidth * 0.75 + 6
    },
    async verifyCardInfo () {
      // // bail if we're not ready yet
      // if (!this.okToSubmit) return

      // // otherwise, submit info to Stripe
      // const { source, error } = await this.stripe.createSource(this.card, {
      //   currency: 'usd',
      //   metadata: this.meta,
      //   owner: this.owner,
      //   usage: 'reusable',
      // })
      // // if there was a problem
      // if (error) {
      //   // do something
      //   console.log(error)
      // } else {
      //   // payment method verified successfully
      //   this.$emit('cardVerified', source)
      // }
    },
  },
}
//  as ComponentOptions<
//   Vue,
//   DefaultData<Vue>,
//   DefaultMethods<Vue>,
//   DefaultComputed,
//   PropsDefinition<Record<string, any>>,
//   Record<string, any>
// >
)
