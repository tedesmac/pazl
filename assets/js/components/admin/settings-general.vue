<template>
  <div>
    <div class="section is-horizontal">
      <div class="a-third form is-vertical subsection">
        <div class="logo-big" />

        <div class="field">
          <div class="justify-center">
            <button class="is-cyan">Pick</button>
          </div>
        </div>
      </div>

      <div class="form is-vertical two-thirds subsection">
        <div class="field">
          <label>Name</label>
          <input type="text" v-model="name" />
        </div>

        <div class="field">
          <label>Description</label>
          <textarea v-model="description"></textarea>
        </div>

        <div class="field">
          <div class="justify-right">
            <button class="is-cyan" @click="onSave">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: '',
      name: '',
    }
  },

  methods: {
    onSave() {
      this.$api.site.put({
        description: this.description,
        name: this.name,
      })
    },
  },

  mounted() {
    this.$api.site
      .get()
      .then(response => {
        const data = response.data
        this.description = data.description
        this.name = data.name
      })
      .catch(error => {})
  },
}
</script>
