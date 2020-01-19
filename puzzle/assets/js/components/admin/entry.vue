<template>
  <div
    :class="['space-around', index % 2 === 0 ? 'entry' : 'entry-alt']"
    :style="style"
    @click="onClick"
  >
    <div>
      <p>{{ name }}</p>
    </div>

    <div v-show="buttons">
      <button class="is-yellow">
        <FontAwesomeIcon :icon="faAngleDown" />
      </button>

      <button class="is-cyan" @click="onEdit">
        <FontAwesomeIcon :icon="faEdit" />
      </button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown, faEdit } from '@fortawesome/free-solid-svg-icons'

export default {
  components: { FontAwesomeIcon },

  props: {
    buttons: {
      type: Boolean,
      default: true,
    },

    editUrl: {
      type: String,
      default: '',
    },

    index: {
      type: Number,
      default: 0,
    },

    name: {
      type: String,
      required: true,
    },

    selectable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
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

    onEdit() {
      if (this.editUrl) {
        window.location = this.editUrl
      }
    },
  },
}
</script>
