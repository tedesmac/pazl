export default {
  namespaced: true,

  state: () => ({
    blockSettings: { data: {}, style: {} },
    edit: true,
    saving: false,
    selected: '',
  }),

  getters: {
    selected: state => state.selected,
  },

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

    setSelected(state, selected) {
      state.selected = selected
    },
  },
}
