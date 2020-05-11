<template>
  <div class="button-group">
    <a>
      <FontAwesomeIcon :icon="faBold" />
    </a>
    <a>
      <FontAwesomeIcon :icon="faItalic" />
    </a>
  </div>
</template>

<script>
import { SetterMixin } from '@/components/mixins'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBold, faItalic } from '@fortawesome/free-solid-svg-icons'

export default {
  mixins: [SetterMixin],

  components: { FontAwesomeIcon },

  computed: {
    faBold: () => faBold,

    faItalic: () => faItalic,
  },
}
</script>
