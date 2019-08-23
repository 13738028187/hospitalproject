import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

// 引入vuex-persistedstate，将vuex的数据持久化到本地
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
