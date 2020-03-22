export const state = () => ({
  user: {},
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}

export const actions = {
  getUser({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.$axios.$get('/users')
        commit('SET_USER', user)
        resolve(user)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        reject(error)
      }
    })
  },
  updateUser({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.$axios.$patch('/users', {
          ...payload,
        })
        commit('SET_USER', user)
        resolve(user)
        // eslint-disable-next-line no-console
        console.log(user)
      } catch (error) {
        reject(error)
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })
  },
}

export const getters = {
  getUser(state) {
    // eslint-disable-next-line no-console
    console.log('getter', state)
    return state.user
  },
}
