import { VueConstructor } from 'vue'
import VStripeInput from './VStripeInput'

export { VStripeInput }
export default {
  install (Vue: VueConstructor, options = {}) {
    Vue.component('v-stripe-input', VStripeInput)
  },
}
// export default VStripeInput
