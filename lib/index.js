import VStripeCard from './VStripeCard';
const VStripeElements = {
  install(Vue, options) {
    Vue.component('v-stripe-card', VStripeCard);
  }

};
export { VStripeCard };
export default VStripeElements;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VStripeElements);
}
//# sourceMappingURL=index.js.map