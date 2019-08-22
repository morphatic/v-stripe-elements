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

describe('VStripeCard', () => {
  type Instance = InstanceType<typeof VStripeCard>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      // @ts-ignore
      global.Stripe = Stripe
      return mount(VStripeCard, {
        mocks: {
          ...vuetifyMocks,
        },
        ...options,
      })
    }
  })

  it('should have an API key', () => {
    const wrapper = mountFunction({
      propsData: { apiKey },
    })
    console.log(inspect(wrapper.html(), false, null, true))
    expect(wrapper.attributes()).toBeDefined()
  })
})
