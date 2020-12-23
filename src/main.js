import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 给Vue实例原型对象加上$bus(事件总线)
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
