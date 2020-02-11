<template>
  <div>
    <label>{{ name }}</label>
    <input maxlength="100" type="text" v-model="value" />
  </div>
</template>

<script>
import { SettingMixin } from '@/components/mixins'

export default {
  mixins: [SettingMixin],
}
</script>
