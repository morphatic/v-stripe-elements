import Vue from 'vue'
import VStripeInputInstaller, { VStripeInput } from '../'
import { mount, MountOptions, Wrapper } from '@vue/test-utils'

describe('VStripeInput', () => {
  describe('installer', () => {
    it('has an install() function', () => {
      expect(typeof VStripeInputInstaller.install).toBe('function')
    })

    it('will register the VStripeInput component on a Vue instance', () => {
      Vue.use(VStripeInputInstaller)
      const vm = new Vue
      expect(vm.$options.components['v-stripe-input']).toBeDefined()
    })
  })

  describe('component', () => {
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
})
