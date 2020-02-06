import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm, info) {
  console.log('errorHandle:', err)
  uploadError(err, info)
}

function uploadError({ stack }, message) {
  // 过滤
  const info = { stack, message }

  console.log('error', info, JSON.stringify(info))
  const str = new Buffer(JSON.stringify(info)).toString("base64");

  console.log('str:', str)
  const host = 'http://localhost:7001/monitor/error'
  new Image().src = `${host}?info=${str}`

}
new Vue({
  render: h => h(App),
}).$mount('#app')

