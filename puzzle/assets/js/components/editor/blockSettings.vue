<template>
  <div style="overflow-y: auto">
    <Setter
      v-for="setter in uniqueSetters"
      :block="block"
      :key="`block_setting_${setter}`"
      :type="setter"
    />

    <Setter type="blockStyle" :block="block" />
  </div>
</template>

<script>
import { setters } from '@/factories/block'
import { mapState } from 'vuex'
import Collapsible from './collapsible'

const Setter = () =>
  import(
    /* webpackChunkName: 'setter' */
    '@/components/setter'
  )

export default {
  components: { Collapsible, Setter },

  computed: mapState({
    block: state => state.editor.selected,

    uniqueSetters: state => {
      const { selected } = state.editor
      const type = state.page.blocks.reduce((acc, b) => {
        if (b.id === selected) {
          return b.type
        }
        return acc
      }, null)

      return setters(type)
    },
  }),
}
</script>
