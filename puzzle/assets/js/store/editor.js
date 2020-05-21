export default {
  namespaced: true,

  state: () => ({
    blockMode: false,
    currentTab: '',
    // TODO remove 'edit' from store
    edit: true,
    mode: 'edit',
    mouseover: '',
    saving: false,
    selected: '',
  }),

  mutations: {
    setBlockMode(state, mode) {
      state.blockMode = mode
    },

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

    setMouseOver(state, value) {
      state.mouseover = value
    },

    setSaving(state, value) {
      state.saving = value
    },

    setSelected(state, selected) {
      state.selected = selected
    },
  },
}
