<template>
  <div class="__pazl_carousel">
    <div class="__pazl_carousel_container" :style="containerStyle">
      <div
        class="__pazl_carousel_element"
        v-for="(element, index) in elements"
        :key="`carousel_element_${index}`"
        :style="{ width: `${width}px` }"
      >
        <div
          class="__pazl_carousel_image"
          :style="{ backgroundImage: `url(${element})` }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { BlockMixin } from '@/components/mixins'

const Block = () => import('@/components/block')

export default {
  mixins: [BlockMixin],

  data() {
    return {
      index: 0,
      resizeEvent: null,
      timeinterval: null,
      width: 0,
    }
  },

  computed: {
    containerStyle() {
      return {
        transform: `translateX(-${this.width * this.index}px)`,
        width: `${this.width * this.elements.length}px`,
      }
    },

    duration() {
      return this.getData('duration', 5)
    },

    elements() {
      return this.getData('elements', [])
    },

    type() {
      return this.getData('type', 'image')
    },
  },

  methods: {
    getWidth() {
      this.width = this.$el.clientWidth
    },
  },

  beforeDestroy() {
    clearInterval(this.timeinterval)
    window.removeEventListener('resize', this.resizeEvent)
  },

  created() {
    this.timeinterval = setInterval(() => {
      this.index += 1
      if (this.index > this.elements.length - 1) {
        this.index = 0
      }
    }, this.duration * 1000)

    this.resizeEvent = window.addEventListener('resize', () => {
      this.getWidth()
    })
  },

  mounted() {
    this.getWidth()
  },
}
</script>
