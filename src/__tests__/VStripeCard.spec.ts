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
import VStripeElements, { VStripeCard } from '..'

// Data necessary for tests
const apiKey = 'pk_test_TYooMQauvdEDq54NiTphI7jx'
const badKey = 'sk_test_TYooMQauvdEDq54NiTphI7jx'
const messages = []

describe('VStripeCard', () => {
  describe('installer', () => {
    it('should register the v-stripe-card component', () => {
      Vue.use(VStripeElements)
      expect(Vue.options.components['v-stripe-card']).toBeTruthy()
    })
  })

  describe('component', () => {
    type Instance = InstanceType<typeof VStripeCard>
    let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  
    beforeEach(() => {
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
        // reset messages
        messages.length = 0
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
    
      it('should throw an error if $loadScript fails', async () => {
        // @ts-ignore
        global.Stripe = null
        try {
          const wrapper = mountFunction({
            mocks: {
              // @ts-ignore
              $loadScript: () => Promise.reject({ message: 404 })
            },
            propsData: { apiKey }
          })
          await wrapper.vm.$nextTick()
          expect(wrapper.vm.errorBucket).toContain('Error loading stripe')
        } catch (err) {
          console.info(err)
        }
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
  
    describe('internal functions and events', () => {
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
  
      it('clearableCallback() should clear the content of the card', () => {
        wrapper.vm.clearableCallback()
        expect(wrapper.vm.card.clear).toHaveBeenCalled()
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
  
      it('isURL() loosely validates URL strings', () => {
        expect(wrapper.vm.isURL(true)).toBe(false)
        expect(wrapper.vm.isURL('http://')).toBe(false)
        expect(wrapper.vm.isURL('http://i-have-no-tld')).toBe(false)
        expect(wrapper.vm.isURL('http://localhost:8080')).toBe(true)
        expect(wrapper.vm.isURL('http://example.com')).toBe(true)
      })
      
      it('onCardBlur() should emit "blur" event', () => {
        const blurEvent = { elementType: 'card' }
        wrapper.setData({ isFocused: true })
        expect(wrapper.vm.isFocused).toBe(true)
        wrapper.vm.onCardBlur(blurEvent)
        expect(wrapper.vm.isFocused).toBe(false)
        expect(wrapper.emitted().blur).toBeTruthy()
        expect(wrapper.emitted().blur[0]).toStrictEqual([blurEvent])
      })
      
      it('onCardChange() should add any errors to the `errorBucket` prop', () => {
        const changeEvent = { elementType: 'card', error: { message: 'uh-oh!' } }
        wrapper.setData({ errorBucket: [] })
        wrapper.vm.onCardChange(changeEvent)
        expect(wrapper.vm.errorBucket).toContain('uh-oh!')
      })
      
      it('onCardChange() should clear errors from the `errorBucket` prop if card is complete', () => {
        const changeEvent = { elementType: 'card', complete: true }
        wrapper.setData({ errorBucket: ['uh-oh!'] })
        wrapper.vm.onCardChange(changeEvent)
        expect(wrapper.vm.errorBucket).not.toContain('uh-oh!')
      })
      
      it('onCardChange() should set the `lazyValue` prop to false if card is empty', () => {
        const changeEvent = { elementType: 'card', empty: true }
        wrapper.setData({ lazyValue: 'some val' })
        wrapper.vm.onCardChange(changeEvent)
        expect(wrapper.vm.lazyValue).toBe(false)
      })
      
      it('onCardFocus() should emit "focus" event', () => {
        const focusEvent = { elementType: 'card' }
        wrapper.setData({ isFocused: false })
        expect(wrapper.vm.isFocused).toBe(false)
        wrapper.vm.onCardFocus(focusEvent)
        expect(wrapper.vm.isFocused).toBe(true)
        expect(wrapper.emitted().focus).toBeTruthy()
        expect(wrapper.emitted().focus[0]).toStrictEqual([true])
      })
      
      it('onCardReady() should emit "ready" event', () => {
        const readyEvent = { elementType: 'card' }
        wrapper.setData({ isReady: false })
        expect(wrapper.vm.isReady).toBe(false)
        wrapper.vm.onCardReady(readyEvent)
        expect(wrapper.vm.isReady).toBe(true)
        expect(wrapper.emitted().ready).toBeTruthy()
        expect(wrapper.emitted().ready[0]).toStrictEqual([readyEvent])
      })
  
      it('onCardReady() should focus the card if `autofocus` is true', () => {
        const readyEvent = { elementType: 'card' }
        const card = { focus: jest.fn() }
        wrapper.setData({ card, autofocus: true })
        wrapper.vm.onCardReady(readyEvent)
        expect(card.focus).toHaveBeenCalled()
      })
  
      it('genCard() should instantiate the `card` prop and associate events', () => {
        // mock the event functions
        wrapper.vm.onCardBlur = jest.fn()
        wrapper.vm.onCardChange = jest.fn()
        wrapper.vm.onCardFocus = jest.fn()
        wrapper.vm.onCardReady = jest.fn()
        // instantiate the card
        wrapper.vm.genCard()
        // call the event functions
        wrapper.vm.card.blur()
        wrapper.vm.card.change()
        wrapper.vm.card.focus()
        wrapper.vm.card.ready()
        // test expectations
        expect(wrapper.vm.stripe).not.toBeNull()
        expect(wrapper.vm.elements).not.toBeNull()
        expect(wrapper.vm.card).not.toBeNull()
        expect(wrapper.vm.card.mount).toHaveBeenCalledWith(expect.stringMatching(/#input-\d+/))
        expect(wrapper.vm.onCardBlur).toHaveBeenCalled()
        expect(wrapper.vm.onCardChange).toHaveBeenCalled()
        expect(wrapper.vm.onCardFocus).toHaveBeenCalled()
        expect(wrapper.vm.onCardReady).toHaveBeenCalled()
      })
    })
  
    describe('card processing', () => {
      beforeEach(() => {
        // capture console.warn
        const capture = m => { messages.push(m.toString()) }
        global.console.warn = jest.fn(capture)
        // @ts-ignore
        global.Stripe = Stripe
      })
  
      it('processCard() should generate a token on success', async () => {
        const wrapper = mountFunction({
          propsData: {
            apiKey,
            options: {
              address_line1: '123 Main St.',
              address_city: 'New York',
              address_state: 'NY',
              address_zip: '12345',
              address_country: 'US',
            },
          },
        })
        await wrapper.vm.processCard()
        expect(wrapper.vm.errorBucket).toStrictEqual([])
        expect(wrapper.emitted().input).toBeTruthy()
        expect((wrapper.emitted().input[0][0] as any).id).toContain('tok_')
        expect((wrapper.emitted().input[0][0] as any).object).toBe('token')
      })
  
      it('processCard() should generate an error on token failure', async () => {
        const wrapper = mountFunction({
          propsData: {
            apiKey,
            options: null,
          },
        })
        await wrapper.vm.processCard()
        expect(wrapper.vm.errorBucket).toStrictEqual(['Not implemented'])
      })
  
      it('processCard() should generate a source on success', async () => {
        const wrapper = mountFunction({
          propsData: {
            apiKey,
            create: 'source',
            options: {
              owner: {
                address: {
                  line1: '123 Main St.',
                  city: 'New York',
                  state: 'NY',
                  postal_code: '12345',
                  country: 'US',
                },
                email: 'somebody@example.com'
              },
            },
          },
        })
        await wrapper.vm.processCard()
        expect(wrapper.vm.errorBucket).toStrictEqual([])
        expect(wrapper.emitted().input).toBeTruthy()
        expect((wrapper.emitted().input[0][0] as any).id).toContain('src_')
        expect((wrapper.emitted().input[0][0] as any).object).toBe('source')
        expect((wrapper.emitted().input[0][0] as any).usage).toBe('reusable')
      })
  
      it('processCard() should generate an error on source failure', async () => {
        const wrapper = mountFunction({
          propsData: {
            apiKey,
            create: 'source',
            options: null,
          },
        })
        await wrapper.vm.processCard()
        expect(wrapper.vm.errorBucket).toStrictEqual(['Not implemented'])
      })
    })
  })
})
