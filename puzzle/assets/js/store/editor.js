export default {
  namespaced: true,

  state: () => ({
    edit: true,
  }),

  mutations: {
    setEdit(state, value) {
      state.edit = value
    },
  },
}
