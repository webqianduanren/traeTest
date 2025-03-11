import Vue from 'vue'
import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseDialog from './components/BaseDialog.vue'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 注册全局组件
Vue.component('BaseDialog', BaseDialog)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
