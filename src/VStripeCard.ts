// Imported Types
/// <reference path="../node_modules/vuetify/src/globals.d.ts" />
import Vue, { VNode } from 'vue'
import { VuetifyThemeVariant } from 'vuetify/types/services/theme'
// import { VuetifyObject } from 'vuetify/types' // !this causes type errors if imported
import { ElementStyles } from '../types'

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
  isDark: boolean
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
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    fontName: {
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
    theme (): VuetifyThemeVariant {
      return this.$vuetify.theme.currentTheme
    },
  },
  watch: {
    isDark (val: boolean, oldVal: boolean) {
      // if the theme changes and a card has already been initialized
      if (val !== oldVal && this.card !== null) {
        // extract key variables from the context
        const { isDark, fontName, theme, customStyle } = this
        // generate styles to match the theme
        const style = this.genStyle(customStyle, fontName, isDark, theme)
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
    // make sure the API key is set correctly
    this.checkAPIKey(this.apiKey)
    // extract props from the context
    const { disabled, fontName, hideIcon, hidePostalCode, iconStyle, isDark, customStyle, theme, zip } = this
    // use them to generate the options we'll need to generate the Stripe and card instances
    const style = this.genStyle(customStyle, fontName, isDark, theme)
    const cardProps = this.genCardProps({ disabled, hideIcon, hidePostalCode, iconStyle, style, zip })
    // make sure the Stripe.js library is loaded
    this.loadStripe()
      // then initialize the Stripe.js object
      .then(() => { this.stripe = Stripe(this.apiKey) }) // eslint-disable-line no-undef
      // then create a Stripe elements generator
      .then(() => { this.elements = this.stripe && this.stripe.elements(this.genFont(this.fontName)) })
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
    /**
     * Checks the API key and warns the user if they are using a secret
     * key (instead of a public key), or if they are using a test key.
     *
     * @param {string} key An API key
     */
    checkAPIKey (key: string): void {
      // if they are using a secret key
      if (/^sk_/.test(key)) {
        console.error('[VStripeCard Error] It looks like you are using a SECRET API key! You should be using your PUBLIC API key. If you have mistakenly made your secret key publicly available on the web, you should strongly consider rolling your API keys. See: https://stripe.com/docs/keys#keeping-your-keys-safe')
      }
      // if they are using a test key
      if (/^pk_test/.test(key)) {
        console.warn('[VStripeCard Warning] Your `v-stripe-card` instance was initialized with a TEST key. This is correct and appropriate for development and/or testing environments. For production environments, please use your LIVE key. See https://stripe.com/docs/keys for more information.')
      }
    },
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
    genCardProps ({
      disabled = false,
      hideIcon = false,
      hidePostalCode = false,
      iconStyle = 'default' as 'default' | 'solid' | undefined,
      style = {},
      zip = '',
    } = {}): stripe.elements.ElementsOptions {
      const cardProps: stripe.elements.ElementsOptions = {
        classes: {
          base: 'VStripeCard',
          complete: 'VStripeCard--complete',
          empty: 'VStripeCard--empty',
          focus: 'VStripeCard--focus',
          invalid: 'VStripeCard--invalid',
          webkitAutofill: 'VStripeCard--webkit-autofill',
        },
        disabled,
        hideIcon,
        hidePostalCode,
        iconStyle,
        style,
      }
      zip && (cardProps.value = { postalCode: zip })
      return cardProps
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
    genFont (font = 'Roboto'): stripe.elements.ElementsCreateOptions {
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
    genStyle: (customStyle: ElementStyles, fontName: string, isDark: boolean, theme: VuetifyThemeVariant): ElementStyles => {
      // borrowed from https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
      // @ts-ignore
      const merge=(t,s)=>{let o=Object,a=o.assign;for(let k of o.keys(s))s[k]instanceof o&&a(s[k],merge(t[k],s[k]));return a(t||{},s),t}
      const defaults: ElementStyles = {
        base: {
          color: isDark ? '#ffffff' : '#000000',
          fontFamily: `'${fontName}', sans-serif`,
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          iconColor: isDark ? '#eceff1' : '#455a64',
          '::placeholder': {
            color: isDark ? 'rgb(255,255,255,0.7)' : 'rgb(0,0,0,0.54)',
          },
        },
        invalid: {
          color: theme.error as string || '#ff5252',
          iconColor: theme.error as string || '#ff5252',
        },
      }
      return merge(defaults, customStyle)
    },
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
    /**
     * Check to see if the Stripe.js library has been loaded into the
     * browser. If it has not, try to load it. If Stripe cannot be
     * loaded or there was a problem with loading, an error is thrown.
     *
     * @throws  {Error}            Could not load Stripe because `vue-plugin-load-script` is not available
     * @throws  {Error}            Could not load Stripe because of a network (or other) error
     * @returns {Promise<boolean>} True if Skype has been loaded, otherwise throws
     */
    loadStripe (): Promise<boolean> {
      // is Stripe already available?
      if (!!Stripe) return Promise.resolve(true)
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
})
