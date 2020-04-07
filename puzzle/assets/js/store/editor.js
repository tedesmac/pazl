export default {
  namespaced: true,

  state: () => ({
    currentTab: '',
    edit: true,
    saving: false,
    selected: '',
  }),

  mutations: {
    setBlockSettings(state, settings) {
      state.blockSettings = settings
    },

    setCurrentTab(state, tab) {
      state.currentTab = tab
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
