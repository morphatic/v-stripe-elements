import Vue from 'vue'
import { VNode } from 'vue/types'
import './VStripeInput.sass'

const VStripeInput = Vue.extend({
  render (h): VNode {
    return h('div', { class: ['v-stripe-input'] }, 'it works!')
  },
})

export default VStripeInput
