import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.config.errorHandler = (err, vm, info) => {
  console.log('errorHandler:', err)
  uploadError({error:err})
}


function uploadError({
  lineno,
  colno,
  error: {
      stack
  },
  timeStamp,
  message,
  filename
}) {
  // 过滤
  const info = {
      lineno,
      colno,
      stack,
      timeStamp,
      message,
      filename
  }
  
  // const str = Base64.encode(JSON.stringify(info))
  const str = window.btoa(JSON.stringify(info))
  const host = 'http://localhost:7001/monitor/error'
  new Image().src = `${host}?info=${str}`
}

window.addEventListener('error', event => {
  console.log('error: ', event)
})

new Vue({
  render: h => h(App),
}).$mount('#app')
