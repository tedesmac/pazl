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
    </div>

    <div class="sidebar__section">
      <label>Media</label>
      <router-link :to="{ name: 'images' }">Images</router-link>
    </div>

    <div class="sidebar__section">
      <label>Site</label>
      <router-link :to="{ name: 'blocks' }">Blocks</router-link>
      <router-link :to="{ name: 'models' }">Models</router-link>
      <router-link :to="{ name: 'pages' }">Pages</router-link>
    </div>

    <div class="sidebar__section">
      <label>Settings</label>
      <router-link :to="{ name: 'settingsProfile' }">Profile</router-link>
      <router-link :to="{ name: 'settingsSite' }">Site</router-link>
      <router-link :to="{ name: 'settingsUsers' }">Users</router-link>
    </div>
  </div>
</template>
