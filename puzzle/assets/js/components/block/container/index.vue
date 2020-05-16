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
      parent="root"
      :block="block.id"
      :class="{
        block: edit,
        'block-hover': block.id === mouseover && edit,
        'block-selected': block.id === selected && edit,
      }"
      :index="index"
      :key="block.id"
      :type="block.type"
      @click.stop.native="onClickBlock(block)"
      @mouseover.stop.native="onMouseOver(block.id)"
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
import { BlockMixin, BlockContainerMixin } from '@/components/mixins'
import { mergeArrays } from '@/utils'

export default {
  mixins: [BlockMixin, BlockContainerMixin],

  computed: {
    blocks: {
      get() {
        return this.$store.getters['page/getChildren'](this.id)
      },

      set(value) {
        const blocks = mergeArrays(value, this.id)
        this.$store.commit('page/updateBlocks', {
          parent: this.id,
          blocks,
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

    direction: {
      get() {
        return this.getData('direction', 'horizontal')
      },

      set(value) {
        this.setData('direction', value)
      },
    },

    id() {
      return this.block.id
    },
  },
}
</script>
