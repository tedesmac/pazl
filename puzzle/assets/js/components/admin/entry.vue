<template>
  <div :class="['space-around', { entry: !isAlt, 'entry-alt': isAlt }]">
    <div>
      <p>{{ name }}</p>
    </div>

    <div>
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
    editUrl: {
      type: String,
      required: true,
    },

    isAlt: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    faAngleDown: () => faAngleDown,
    faEdit: () => faEdit,
  },

  methods: {
    onEdit() {
      window.location = this.editUrl
    },
  },
}
</script>
