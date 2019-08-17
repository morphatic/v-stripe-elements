import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'

Vue.config.productionTip = false

Vue.use(Vuetify)

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
})

const vm = new Vue({
  data: () => ({ isLoaded: document.readyState === 'complete' }),
  vuetify,
  render (h) {
    return this.isLoaded ? h(App) : undefined
  },
}).$mount('#app')

// Prevent layout jump while waiting for styles
vm.isLoaded || window.addEventListener('load', () => {
  vm.isLoaded = true
})
