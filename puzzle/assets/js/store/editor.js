export default {
  namespaced: true,

  state: () => ({
    blockSettings: { data: {}, style: {} },
    edit: true,
    saving: false,
  }),

  mutations: {
    setBlockSettings(state, settings) {
      state.blockSettings = settings
    },

    setEdit(state, value) {
      state.edit = value
    },

    setSaving(state, value) {
      state.saving = value
    },
  },
}
