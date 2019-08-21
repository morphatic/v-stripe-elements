// Types
import Vue from 'vue'

// Extensions and Components
// @ts-ignore
import { VTextField } from 'vuetify/lib'

// Mixins
// @ts-ignore
// import mixins from 'vuetify/lib/util/mixins'
// const baseMixins = mixins(VTextField)

// Extend VTextField to define the VStripeInput component
const VTestInput = Vue.extend({
  name: 'v-test-input',
  extends: VTextField,
})

export { VTestInput }
export default VTestInput
