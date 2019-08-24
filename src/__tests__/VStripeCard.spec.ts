import Vue from 'vue'
// Utils
import { mount, MountOptions, Wrapper } from '@vue/test-utils'
import { inspect } from 'util'

// Mocks
import Stripe from '../../test/mocks/stripe'
const vuetifyMocks = {
  $vuetify : {
    theme: {
      currentTheme: {
        error: '#ff0000',
      },
      dark: false,
      lang: {
        t: (val: string) => val,
      },
    },
  },
}


// Component to be tested
import { VStripeCard } from '..'

// Data necessary for tests
const apiKey = 'pk_test_TYooMQauvdEDq54NiTphI7jx'
const badKey = 'sk_test_TYooMQauvdEDq54NiTphI7jx'
const messages = []

describe('VStripeCard', () => {
  type Instance = InstanceType<typeof VStripeCard>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    // capture console
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VStripeCard, {
        mocks: {
          ...vuetifyMocks,
        },
        ...options,
      })
    }
  })

  describe('initialization', () => {
    beforeEach(() => {
      // capture console
      const capture = m => { messages.push(m.toString()) }
      global.console.error = jest.fn(capture)
      global.console.warn = jest.fn(capture)
      global.console.log = jest.fn(capture)
    })

    it('should issue an error warning if the API key is a secret key', () => {
      // @ts-ignore
      global.Stripe = Stripe
      mountFunction({ propsData: { apiKey: badKey } })
      expect(messages.pop()).toMatch(/It looks like you are using a SECRET API key!/)
    });
  
    it('should issue a warning if the API key is a test key', () => {
      // @ts-ignore
      global.Stripe = Stripe
      mountFunction({ propsData: { apiKey } })
      expect(messages.pop()).toMatch(/instance was initialized with a TEST key/)
    });
  
    it('should render component and match snapshot', () => {
      // @ts-ignore
      global.Stripe = Stripe
      const wrapper = mountFunction({
        propsData: { apiKey },
      })
      // replace the auto-generated `id` with one that matches
      const html = wrapper.html().replace(/div id="input-\d+"/, 'div id="input-1"')
      expect(html).toMatchSnapshot()
    })
  
    it('should throw an error if Stripe was not and could not be loaded', () => {
      // @ts-ignore
      global.Stripe = null
      // @ts-ignore
      Vue.$loadScript = undefined
      expect(() => { mountFunction({ propsData: { apiKey } }) }).toThrow(/Stripe is not available and could not be loaded/)
    });
  
    it('should throw an error if $loadScript fails', () => {
      // @ts-ignore
      global.Stripe = null
      const wrapper = mountFunction({
        mocks: {
          // @ts-ignore
          $loadScript: () => Promise.reject({ message: '404' })
        },
        propsData: { apiKey }
      })
      wrapper.vm.$nextTick()
      .then(() => wrapper.vm.$nextTick())
      .then(() => wrapper.vm.$nextTick())
      .then(() => { expect(messages.pop()).toMatch(/There was a problem loading Stripe/) })
    });
  
    it('should work fine if $loadScript returns Stripe as intended', () => {
      const wrapper = mountFunction({
        mocks: {
          // @ts-ignore
          $loadScript: () => { global.Stripe = Stripe; return Promise.resolve(true); }
        },
        propsData: { apiKey },
      })
      expect(wrapper.attributes()).toBeDefined()
    })
  
    it('should have an API key', () => {
      // @ts-ignore
      global.Stripe = Stripe
      const wrapper = mountFunction({ propsData: { apiKey }, })
      expect(wrapper.attributes()).toBeDefined()
    })
  })

  describe('internal functions', () => {
    let wrapper
    beforeEach(() => {
      // capture console.warn
      const capture = m => { messages.push(m.toString()) }
      global.console.warn = jest.fn(capture)
      // @ts-ignore
      global.Stripe = Stripe
      wrapper = mountFunction({
        propsData: { apiKey }
      })
    })

    it('genStyle() should generate a `style` object in the format that Stripe expects', () => {
      expect(wrapper.vm.genStyle({}, 'Roboto', false, {})).toMatchSnapshot()
      expect(wrapper.vm.genStyle({ base: { color: '#ccc' } }, 'Open Sans', true, { error: '#f00' })).toMatchSnapshot()
    })
    
    it('genCardProps() should generate a `cardProps` object in the format that Stripe expects', () => {
      const style = wrapper.vm.genStyle({ base: { color: '#ccc' } }, 'Open Sans', true, { error: '#f00' })
      expect(wrapper.vm.genCardProps()).toMatchSnapshot()
      expect(wrapper.vm.genCardProps({
        disabled: false,
        hideIcon: false,
        hidePostalCode: false,
        iconStyle: 'default',
        style,
        zip: '12345',
      })).toMatchSnapshot()
    })
    
    it('genFont() should generate an `ElementsCreateOptions` object in the format that Stripe expects', () => {
      expect(wrapper.vm.genFont()).toMatchSnapshot()
      expect(wrapper.vm.genFont('Open Sans')).toMatchSnapshot()
    })
    
  })
})
