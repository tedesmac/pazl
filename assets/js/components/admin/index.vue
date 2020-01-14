<template>
  <div class="admin">
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar'

export default {
  components: { Sidebar },
}
</script>
