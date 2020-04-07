<template>
  <textarea ref="textarea" style="margin-top: 1.5em" v-model="handler" />
</template>

<script>
import EasyMDE from 'easymde'
import 'easymde/dist/easymde.min.css'

export default {
  data() {
    return {
      mde: null,
    }
  },

  props: {
    value: String,
  },

  computed: {
    handler: {
      get() {
        return this.value
      },

      set(value) {
        this.$emit('input', value)
      },
    },
  },

  beforeDestroy() {
    this.mde = null
  },

  mounted() {
    //   this.mde = new EasyMDE({
    //     element: this.$refs.textarea,
    //     minHeight: '6em',
    //     placeholder: 'Markdown',
    //     spellChecker: false,
    //     status: false,
    //     toolbar: false,
    //   })
    //   this.mde.value(this.value != null ? this.value : '')
    //   this.mde.codemirror.on('change', () => {
    //     this.$emit('input', this.mde.value())
    //   })
  },
}
</script>
