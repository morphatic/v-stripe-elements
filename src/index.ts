import { VueConstructor } from 'vue'
import VStripeInput from './VStripeInput'

export { VStripeInput }
export default {
  install (Vue: VueConstructor) {
    Vue.component('v-stripe-input', VStripeInput)
  }
}
