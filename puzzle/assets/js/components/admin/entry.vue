<template>
  <div
    :class="['space-between', index % 2 === 0 ? 'entry' : 'entry-alt']"
    :style="style"
    @click="onClick"
  >
    <div>
      <p>
        {{ name }}
        <FontAwesomeIcon v-if="published != null" :icon="publishedIcon" />
      </p>
    </div>

    <div v-show="buttons">
      <button class="is-yellow" v-popover="{ name: popOverName }">
        <FontAwesomeIcon :icon="faAngleDown" />
      </button>

      <button class="is-cyan" @click="$emit('edit')">
        <FontAwesomeIcon :icon="faEdit" />
      </button>
    </div>

    <slot name="buttons" />

    <popover :name="popOverName" :width="110">
      <div class="is-vertical">
        <slot name="actions" />
        <button class="is-red" @click="$emit('delete')">Delete</button>
      </div>
    </popover>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'

export default {
  components: { FontAwesomeIcon },

  props: {
    buttons: {
      type: Boolean,
      default: true,
    },

    index: {
      type: Number,
      default: 0,
    },

    name: {
      type: String,
      required: true,
    },

    published: {
      default: null,
    },

    selectable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    popOverName() {
      return `${this.name}_${this.index}`
    },

    publishedIcon() {
      if (this.published) {
        return faEye
      } else if (this.published === false) {
        return faEdit
      }
    },

    style() {
      return {
        cursor: this.selectable ? 'pointer' : 'auto',
      }
    },

    faAngleDown: () => faAngleDown,
    faEdit: () => faEdit,
  },

  methods: {
    onClick() {
      if (this.selectable) {
        this.$emit('selected')
      }
    },
  },
}
</script>
