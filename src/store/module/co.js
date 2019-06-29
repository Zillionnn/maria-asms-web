const state = {
  coList: []
}

const getters = {
  coList (state) {
    return state.coList
  }
}

const actions = {
  passCoList ({commit, state}, list) {
    commit('setCoList', list)
  }
}

const mutations = {
  setCoList (state, payload) {
    state.coList = payload
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
