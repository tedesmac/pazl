export default {
  namespaced: true,

  state: () => ({
    blockSettings: { data: {}, style: {} },
    currentBlockId: '',
    edit: true,
    saving: false,
  }),

  mutations: {
    setBlockSettings(state, payload) {
      state.currentBlockId = payload.id
      state.blockSettings = payload.settings
    },

    setEdit(state, value) {
      state.edit = value
    },

    setSaving(state, value) {
      state.saving = value
    },
  },
}
