const state = {
  coList: [],
  coplan: {}
}

const getters = {
  coList (state) {
    return state.coList
  },
  coplan (state) {
    return state.coplan
  }
}

const actions = {
  passCoList ({commit, state}, list) {
    commit('setCoList', list)
  },

  passCoplan ({commit, state}, coplan) {
    commit('setCoplan', coplan)
  }
}

const mutations = {
  setCoList (state, payload) {
    state.coList = payload
  },

  setCoplan (state, payload) {
    state.coplan = payload
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
