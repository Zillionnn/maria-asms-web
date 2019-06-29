import Vue from 'vue'
import Vuex from 'vuex'
// import env from '@/conf/env'
// import createLogger from 'vuex/dist/logger'
import co from './module/co.js'
import advt from './module/advt.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    co,
    advt
  }
//   strict: env.debug,
//   plugins: env.debug ? [createLogger()] : []
})
