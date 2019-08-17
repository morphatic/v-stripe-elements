import VStripeInput from '../VStripeInput'
import { mount, MountOptions, Wrapper } from '@vue/test-utils'

describe('VStripeInput', () => {
  type Instance = InstanceType<typeof VStripeInput>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => mount(VStripeInput, options)
  })

  it('should have an API key', () => {
    const wrapper = mountFunction({
      propsData: {
        'api-key': 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
      },
    })
    expect(wrapper.attributes('api-key')).toBe('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
  })
})
