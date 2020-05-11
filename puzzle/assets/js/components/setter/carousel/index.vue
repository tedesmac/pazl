<template>
  <div>
    <div class="is-horizontal">
      <label>Type:</label>
      <select>
        <option>Entry</option>
        <option>Image</option>
      </select>
    </div>

    <div class="is-horizontal"></div>

    <div class="is-horizontal"></div>
  </div>
</template>

<script>
import { SetterMixin } from '@/components/mixins'

export default {
  mixins: [SetterMixin],
}
</script>
