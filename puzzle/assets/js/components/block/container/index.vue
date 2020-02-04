<template>
  <Draggable
    v-if="edit"
    v-model="blocks"
    group="blocks"
    :class="classes"
    :style="style"
    @end="onEnd"
  >
    <Block
      v-for="(block, index) in blocks"
      :block="block.id"
      :index="index"
      :key="block.id"
      :parent="id"
      :type="block.type"
    />
  </Draggable>

  <div v-else :class="classes" :style="style">
    <Block
      v-for="(block, index) in blocks"
      :block="block.id"
      :index="index"
      :key="block.id"
      :parent="id"
      :type="block.type"
    />
  </div>
</template>

<script>
import { direction } from '@/constants'
import Block from '@/components/block'
import { BlockMixin, BlockContainerMixin } from '@/components/mixins'
import Draggable from 'vuedraggable'
import { mapstate } from 'vuex'

export default {
  mixins: [BlockMixin, BlockContainerMixin],

  computed: {
    blocks: {
      get() {
        return this.$store.getters['page/getChildren'](this.id)
      },

      set(value) {
        this.$store.commit('page/updateBlocks', {
          blocks: value.map(b => ({ ...b, parent: this.id })),
          parent: this.id,
        })
      },
    },

    classes() {
      return {
        'container-block': this.edit,
        __puzzle_horizontal: this.direction === direction.horizontal,
        __puzzle_vertical: this.direction === direction.vertical,
      }
    },

    direction() {
      return this.data.direction
    },

    ...mapState({
      edit: state => (state.editor ? state.editor.edit : false),
    }),
  },
}
</script>
