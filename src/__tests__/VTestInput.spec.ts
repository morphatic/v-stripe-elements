// Utils
import { mount, MountOptions, Wrapper } from '@vue/test-utils'
import { inspect } from 'util'

// Component to be tested
import VTestInput from '../VTestInput'

const vuetifyMocks = {
  $vuetify : {
    theme: {
      dark: false,
      currentTheme: {
        error: '#ff0000',
      },
    },
  },
}
console.log(inspect(VTestInput, false, null, true))
describe('VTestInput', () => {
  type Instance = InstanceType<typeof VTestInput>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      // @ts-ignore
      return mount(VTestInput, {
        // mocks: {
        //   ...vuetifyMocks,
        // },
        ...options,
      })
    }
  })

  it('should render', () => {
    const wrapper = mountFunction({
      propsData: { label: 'Test' },
    })
    console.log('exists: ', inspect(wrapper, false, null, true))
    expect(wrapper.attributes()).not.toBe(undefined)
  })
})
