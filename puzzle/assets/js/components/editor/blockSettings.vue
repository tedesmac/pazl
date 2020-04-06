<template>
  <div>
    <Collapsible
      v-for="key in Object.keys(dataSettings)"
      :key="`data_setting_${key}`"
      :string="key"
    />

    <hr v-if="dataSettings.length" />

    <Collapsible
      v-for="key in Object.keys(styleSettings)"
      :key="`style_setting_category_${key}`"
      :string="key"
    >
      <Setting
        v-for="sk in Object.keys(styleSettings[key])"
        root="style"
        :key="`style_setting_${key}_${sk}`"
        :setting="styleSettings[key][sk]"
        :type="styleSettings[key][sk].settingType"
      />
    </Collapsible>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Collapsible from './collapsible'

const Setting = () =>
  import(
    /* webpackChunkName: 'setting' */
    '@/components/setting'
  )

export default {
  components: { Collapsible, Setting },

  data() {
    return {
      activeTab: 'Block',
    }
  },

  computed: mapState({
    dataSettings: state => {
      const { data } = state.editor.blockSettings
      return Object.keys(data).reduce((acc, key) => {
        const setting = data[key]
        const { sidebarSetting } = setting
        if (sidebarSetting) {
          acc[key] = setting
        }
        return acc
      }, {})
    },

    styleSettings: state => {
      const { style } = state.editor.blockSettings
      return Object.keys(style).reduce((acc, key) => {
        const setting = style[key]
        const { settingCategory } = setting
        if (settingCategory) {
          if (settingCategory in acc) {
            acc[settingCategory] = [...acc[settingCategory], setting]
          } else {
            acc[settingCategory] = [setting]
          }
        } else {
          if ('Other' in acc) {
            acc['Other'] = [...acc['Other'], setting]
          } else {
            acc['Other'] = [setting]
          }
        }
        return acc
      }, {})
    },
  }),
}
</script>
