export const state = () => ({
  error: ''
})

export const mutations = {
  SET_ERROR(state, payload) {
    state.error = payload
  }
}
export const actions = {}
export const getters = {
  error(state) {
    return state.error
  }
}
