// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// import colors from 'vuetify/es5/util/colors'
import {Upload} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zAlert from '@/components/common/message/index'

import { formatTime } from '@/utils/tool'

Vue.use(Upload)
Vue.prototype.$message = zAlert

Vue.use(Vuetify, {
  theme: {
    primary: {
      base: '#03a9f4s'
    },
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.directive('formatTs', {
  bind: (el, binding, vnode, oldVnode) => {
    // console.log(el, binding, vnode, oldVnode)
    let time = formatTime(binding.value)
    el.innerHTML = `${time}`
  },
  inserted: () => {

  },
  update: (el, binding, vnode, oldVnode) => {
    // console.log(el, binding, vnode, oldVnode)
    let time = formatTime(binding.value)
    el.innerHTML = `${time}`
  },
  componentUpdated: () => {
    // console.log('component update')
  },
  unbind: () => {

  }
})
