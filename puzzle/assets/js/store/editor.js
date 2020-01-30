export default {
  state: () => ({
    edit: true,
  }),

  mutations: {
    setEdit(state, value) {
      state.edit = value
    },
  },
}
