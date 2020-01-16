<template>
  <div>
    <div class="section is-horizontal space-around">
      <h2>Models</h2>

      <button class="is-cyan" @click="onNewModel">
        New
      </button>
    </div>

    <div class="section"></div>
  </div>
</template>

<script>
export default {
  methods: {
    onNewModel() {
      window.location = '/puzzle/editor/model/'
    },
  },
}
</script>
