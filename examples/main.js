import Vue from 'vue'
import App from './App.vue'
import VcompUI from '../src'

// import { DragBox } from '../src'

import '../src/style/index.scss'

Vue.use(VcompUI)
// Vue.use(DragBox)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
