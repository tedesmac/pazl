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
import Block from 'components/block'
import { BlockMixin, BlockContainerMixin } from 'components/mixins'
import Draggable from 'vuedraggable'

export default {
  mixins: [BlockMixin, BlockContainerMixin],

  components: { Block },

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
        __puzzle_horizontal: this.direction === 'horizontal',
        __puzzle_vertical: this.direction === 'vertical',
      }
    },

    direction() {
      return this.options.direction
    },
  },

  beforeMount() {
    if (!this.options.direction) {
      this.options = {
        direction: 'horizontal',
      }
    }
  },
}
</script>
