export default {
  namespaced: true,

  state: () => ({
    currentTab: '',
    edit: true,
    mode: 'edit',
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

    setMode(state, value) {
      state.mode = value
    },

    setSaving(state, value) {
      state.saving = value
    },

    setSelected(state, selected) {
      state.selected = selected
    },
  },
}
