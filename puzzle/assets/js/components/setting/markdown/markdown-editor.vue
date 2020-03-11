<template>
  <textarea :id="`mde_${id}`" />
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
    id: String,
    value: String,
  },

  beforeDestroy() {
    console.log('beforeDestroy')
    this.mde.toTextArea()
    this.mde = null
    console.log(this.id, 'destroyed')
  },

  mounted() {
    this.mde = new EasyMDE({
      element: document.getElementById(`mde_${this.id}`),
      minHeight: '6em',
      placeholder: 'Markdown',
      spellChecker: false,
      status: false,
      toolbar: false,
    })
    this.mde.value(this.value != null ? this.value : '')
    this.mde.codemirror.on('change', () => {
      this.$emit('input', this.mde.value())
    })
  },
}
</script>
