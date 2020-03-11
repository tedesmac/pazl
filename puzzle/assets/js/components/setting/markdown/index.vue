<template>
  <MDE :id="id" v-model="value" />
</template>

<script>
import { SettingMixin } from '@/components/mixins'
import MDE from './markdown-editor'

export default {
  mixins: [SettingMixin],

  components: { MDE },
}
</script>
