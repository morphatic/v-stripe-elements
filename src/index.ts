import { VueConstructor } from 'vue'
import VStripeCard from './VStripeCard'

const VStripeElements = {
  install (Vue: VueConstructor, options?: any) {
    Vue.component('v-stripe-card', VStripeCard)
  },
}

export { VStripeCard }
export default VStripeElements

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VStripeElements)
}
