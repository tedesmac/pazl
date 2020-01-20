<template>
  <div class="sidebar">
    <div class="sidebar__head">
      <div class="logo" />
      <div class="info">
        <a href="/"><b>Site name</b></a>
        <router-link class="user" :to="{ name: 'settingsProfile' }"
          >Username</router-link
        >
      </div>
    </div>

    <div class="sidebar__section">
      <label>Entries</label>
      <router-link
        v-for="(model, index) in models"
        :key="`model_${model.name}`"
        :to="{ name: 'adminEntries', params: { model: model.id } }"
      >
        {{ model.name }}
      </router-link>
    </div>

    <div class="sidebar__section">
      <label>Media</label>
      <router-link :to="{ name: 'adminImages' }">Images</router-link>
    </div>

    <div class="sidebar__section">
      <label>Site</label>
      <router-link :to="{ name: 'adminBlocks' }">Blocks</router-link>
      <router-link :to="{ name: 'adminModels' }">Models</router-link>
      <router-link :to="{ name: 'adminPages' }">Pages</router-link>
    </div>

    <div class="sidebar__section">
      <label>Settings</label>
      <router-link :to="{ name: 'settingsProfile' }">Profile</router-link>
      <router-link :to="{ name: 'settingsSite' }">Site</router-link>
      <router-link :to="{ name: 'settingsUsers' }">Users</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    models: state => state.admin.models,
  }),
}
</script>
