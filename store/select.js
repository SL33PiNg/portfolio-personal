/* eslint-disable prettier/prettier */
export const state = () => ({
  department: [],
  expert: [],
  ocsc: []
})

export const mutations = {
  SET_DEPARTMENT (state, data) {
    state.department = data
  },
  SET_EXPERT (state, data) {
    state.expert = data
  },
  SET_OCSC (state, data) {
    state.ocsc = data
  }
}

export const actions = {
  getAllSelect ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const department = this.$axios.$get('/select/department')
        const expert = this.$axios.$get('/select/expertist')
        const ocsc = this.$axios.$get('/select/positionOcsc')
        const result = await Promise.all([ department, expert, ocsc ])
        commit('SET_DEPARTMENT', result[0])
        commit('SET_EXPERT', result[1])
        commit('SET_OCSC', result[2])
        console.log(result)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export const getters = {
  getDepartment: (state) => (id) => {
    const found = state.department.find((f) => f._id === id)
    const c = { ...found }
    return c.name
  }
}
