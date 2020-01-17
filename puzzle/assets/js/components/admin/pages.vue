<template>
  <div>
    <div class="section is-horizontal space-around">
      <h2>Pages</h2>

      <button class="is-cyan" @click="onNew">New</button>
    </div>

    <div class="section"></div>
  </div>
</template>

<script>
export default {
  methods: {
    onNew() {
      window.location = '/puzzle/editor/page/'
    },
  },
}
</script>
