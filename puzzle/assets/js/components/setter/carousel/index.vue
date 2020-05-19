<template>
  <Collapsible string="Carousel">
    <div class="is-horizontal subsetter">
      <label>Dration (s):</label>
      <input type="number" v-model="duration" />
    </div>

    <div class="is-horizontal subsetter">
      <label>Type:</label>
      <select>
        <option>Entry</option>
        <option>Image</option>
      </select>
    </div>

    <hr />

    <div class="is-vertical">
      <div
        v-for="(element, index) in elements"
        class="is-horizontal subsetter"
        :key="`carousel_element_${index}`"
      >
        <label>
          {{ element }}
        </label>

        <button @click="onRemoveElement(index)">X</button>
      </div>

      <div class="is-horizontal subsetter">
        <button @click="onAddElement">
          Add
        </button>
      </div>
    </div>
  </Collapsible>
</template>

<script>
import Collapsible from '@/components/editor/collapsible'
import { SetterMixin } from '@/components/mixins'

export default {
  mixins: [SetterMixin],

  components: { Collapsible },

  computed: {
    duration: {
      get() {
        return this.getData('duration', 5)
      },

      set(value) {
        let number
        try {
          number = Number(value)
        } catch {
          number = 5
        }
        return this.setData('duration', value)
      },
    },

    elements: {
      get() {
        return this.getData('elements', [])
      },

      set(value) {
        this.setData('elements', value)
      },
    },

    type: {
      get() {
        return this.getData('type', 'image')
      },

      set(value) {
        this.setData('type', 'value')
      },
    },
  },

  methods: {
    onAddElement() {
      this.$modal.show('image-select', {
        callback: image => {
          const { url } = image
          this.elements = [...this.elements, url]
        },
      })
    },

    onRemoveElement(index) {
      this.elements = this.elements.filter(_, i => i !== index)
    },
  },
}
</script>
