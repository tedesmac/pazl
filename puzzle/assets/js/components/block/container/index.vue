<template>
  <Draggable
    v-if="edit"
    v-model="blocks"
    group="blocks"
    :class="classes"
    :style="style"
    @end="onEnd"
  >
    <div
      v-for="(block, index) in blocks"
      :block="block.id"
      :class="{ block: edit }"
      :key="block.id"
    >
      <div class="type">{{ block.type }}</div>

      <Block :block="block.id" :index="index" :parent="id" :type="block.type" />

      <FontAwesomeIcon
        class="edit-icon"
        :icon="faEdit"
        @click="onEditBlock(block)"
      />
    </div>
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

    id() {
      return this.block.id
    },
  },
}
</script>
