import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.config.errorHandler = (err, vm, info) => {
  console.log('errorHandler:', err)
}

window.addEventListener('error', event => {
  console.log('error: ', event)
})

new Vue({
  render: h => h(App),
}).$mount('#app')
