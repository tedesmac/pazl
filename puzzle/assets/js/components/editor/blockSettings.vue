<template>
  <div>
    <div class="tab-list">
      <div
        :class="['tab', { 'tab-active': activeTab === 'Block' }]"
        @click="activeTab = 'Block'"
      >
        Block
      </div>

      <div class="separator" />

      <div
        :class="['tab', { 'tab-active': activeTab === 'Style' }]"
        @click="activeTab = 'Style'"
      >
        Style
      </div>
    </div>

    <div v-if="activeTab === 'Block'" class="setting-list">
      <Setting
        v-for="setting in dataSettings"
        root="data"
        :key="setting._name"
        :setting="setting"
        :type="setting.settingType"
      />
    </div>

    <div v-else class="setting-list">
      <Setting
        v-for="setting in styleSettings"
        root="style"
        :key="setting._name"
        :setting="setting"
        :type="setting.settingType"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const Setting = () =>
  import(
    /* webpackChunkName: 'setting' */
    '@/components/setting'
  )

export default {
  components: { Setting },

  data() {
    return {
      activeTab: 'Block',
    }
  },

  computed: mapState({
    dataSettings: state => {
      const { data } = state.editor.blockSettings
      return Object.keys(data).reduce(
        (acc, k) => [
          ...acc,
          {
            ...data[k],
            _name: k,
          },
        ],
        []
      )
    },

    styleSettings: state => {
      const { style } = state.editor.blockSettings
      return Object.keys(style).reduce(
        (acc, k) => [
          ...acc,
          {
            ...style[k],
            _name: k,
          },
        ],
        []
      )
    },
  }),
}
</script>
