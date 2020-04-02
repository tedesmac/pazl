<template>
  <div>
    <div class="section is-horizontal space-between">
      <div>
        <h2>Users</h2>
      </div>
      <div>
        <button class="is-cyan">New</button>
      </div>
    </div>

    <div class="section is-vertical">
      <entry
        v-for="(user, index) in users"
        :buttons="false"
        :index="index"
        :key="`user_${user.id}`"
        :name="user.username"
      >
        <template #buttons>
          {{ user.role }}
        </template>
      </entry>
    </div>
  </div>
</template>

<script>
import { AdminListingMixin } from '@/components/mixins'

export default {
  mixins: [AdminListingMixin],

  data() {
    return {
      users: [],
    }
  },

  methods: {
    fetchUsers() {
      this.$api.users.get().then(users => {
        this.users = users
      })
    },
  },

  created() {
    this.fetchUsers()
  },
}
</script>
