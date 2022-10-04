import Vue from 'vue'
import App from './App.vue'
import './axios'
Vue.config.productionTip = false

import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueObserveVisibility)

new Vue({
  render: h => h(App),
}).$mount('#app')
