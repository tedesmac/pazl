<template>
  <div>
    <Collapsible string="Background" :show="false">
      <Color
        class="subsetter"
        v-model="background"
        @clear="removeStyle('background')"
      />
    </Collapsible>

    <Collapsible string="Border" :show="false">
      <Color
        class="subsetter"
        v-model="boderColor"
        @clear="removeStyle('borderColor')"
      />

      <Number
        class="subsetter"
        :options="['px', '%', 'rem']"
        v-model="borderRadius"
      >
        Radius:
      </Number>

      <div class="subsetter">
        <select></select>
      </div>

      <Number class="subsetter" :options="['px', 'rem']" v-model="borderWidth">
        Width:
      </Number>
    </Collapsible>

    <Collapsible string="Margin" :show="false">
      <MultiNumber :options="['px', 'rem']" v-model="margin" />
    </Collapsible>

    <Collapsible string="Padding" :show="false">
      <MultiNumber :options="['px', 'rem']" v-model="padding" />
    </Collapsible>

    <Collapsible string="Size" :show="false">
      <Number
        v-model="height"
        label="Height"
        :options="['', 'px', 'rem', 'vh', '%']"
      />

      <Number
        v-model="width"
        label="Width"
        :options="['', 'px', 'rem', 'vw', '%']"
      />
    </Collapsible>
  </div>
</template>

<script>
import Collapsible from '@/components/editor/collapsible'
import Color from '@/components/misc/color'
import MultiNumber from '@/components/misc/multi-number'
import Number from '@/components/misc/number'
import { SetterMixin } from '@/components/mixins'

export default {
  mixins: [SetterMixin],

  components: { Collapsible, Color, MultiNumber, Number },

  computed: {
    background: {
      get() {
        const { background = '#ffffff' } = this.style
        return background
      },

      set(value) {
        this.setStyle('background', value)
      },
    },

    boderColor: {
      get() {
        const { borderColor = '#000000' } = this.style
        return borderColor
      },

      set(value) {
        this.setStyle('borderColor', value)
      },
    },

    borderRadius: {
      get() {
        return this.getStyle('borderRadius')
      },

      set(value) {
        this.setStyle('borderRadius', value)
      },
    },

    borderWidth: {
      get() {
        return this.getStyle('borderWidth')
      },

      set(value) {
        this.setStyle('borderWidth', value)
      },
    },

    height: {
      get() {
        return this.getStyle('height')
      },

      set(value) {
        if (value) {
          this.setStyle('height', value)
        } else {
          this.removeStyle('height')
        }
      },
    },

    margin: {
      get() {
        const {
          marginBottom = '0px',
          marginLeft = '0px',
          marginRight = '0px',
          marginTop = '0px',
        } = this.style
        return {
          bottom: marginBottom,
          left: marginLeft,
          right: marginRight,
          top: marginTop,
        }
      },

      set(value) {
        const { bottom = '0', left = '0', right = '0', top = '0' } = value
        this.setStyle('marginBottom', bottom)
        this.setStyle('marginLeft', left)
        this.setStyle('marginRight', right)
        this.setStyle('marginTop', top)
      },
    },

    padding: {
      get() {
        const {
          paddingBottom = '0px',
          paddingLeft = '0px',
          paddingRight = '0px',
          paddingTop = '0px',
        } = this.style
        return {
          bottom: paddingBottom,
          left: paddingLeft,
          right: paddingRight,
          top: paddingTop,
        }
      },

      set(value) {
        const { bottom = '0', left = '0', right = '0', top = '0' } = value
        this.setStyle('paddingBottom', bottom)
        this.setStyle('paddingLeft', left)
        this.setStyle('paddingRight', right)
        this.setStyle('paddingTop', top)
      },
    },

    width: {
      get() {
        return this.getStyle('width')
      },

      set(value) {
        if (value) {
          this.setStyle('width', value)
        } else {
          this.removeStyle('width')
        }
      },
    },
  },
}
</script>
