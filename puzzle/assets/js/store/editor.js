export default {
  namespaced: true,

  state: () => ({
    blockSettings: { data: {}, style: {} },
    currentBlockId: '',
    edit: true,
  }),

  mutations: {
    setBlockSettings(state, payload) {
      state.currentBlockId = payload.id
      state.blockSettings = payload.settings
    },

    setEdit(state, value) {
      state.edit = value
    },
  },
}
