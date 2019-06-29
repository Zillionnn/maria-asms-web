const state = {
  selectedSpace: [],
  selectCO: {}
}

const getters = {
  selectedSpace (state) {
    return state.selectedSpace
  },
  selectCO (state) {
    return state.selectCO
  }
}

const actions = {
  passClearSelected ({ commit, state }) {
    commit('setAdvtSpace', [])
  },
  passOneSpace ({ commit, state }, item) {
    let list = [...state.selectedSpace]
    let exsitIds = list.map(item => {
      return item.id
    })
    if (exsitIds.indexOf(item.id) === -1) {
      list.push(item)
    }
    commit('setAdvtSpace', list)
  },

  passRmSpace ({ commit, state }, item) {
    let list = [...state.selectedSpace]
    let exsitIds = list.map(item => {
      return item.id
    })
    let rmIdx = exsitIds.indexOf(item.id)
    list.splice(rmIdx, 1)
    commit('setAdvtSpace', list)
  },
  passCO ({ commit, state }, item) {
    commit('setCO', item)
  }
}

const mutations = {
  setAdvtSpace (state, payload) {
    console.log('COMMIT>> ', payload)
    state.selectedSpace = payload
  },
  setCO (state, payload) {
    state.selectCO = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
