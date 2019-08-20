import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import LoadScript from 'vue-plugin-load-script'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(LoadScript)

const vuetify = new Vuetify({
  theme: {
    dark: false,
  },
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
