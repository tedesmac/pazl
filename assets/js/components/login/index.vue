<template>
  <div class="login">
    <div class="form">
      <div class="field">
        <input
          type="text"
          placeholder="Email or Username"
          v-model="emailOrUser"
        />
      </div>

      <div class="field">
        <input type="password" placeholder="Password" v-model="password" />
      </div>

      <div class="field">
        <button @click="authenticate">Login</button>
      </div>
    </div>

    <div class="image" />
  </div>
</template>

<script>
const email_re = /\S+@\S+\.\S+/

export default {
  data() {
    return {
      emailOrUser: '',
      password: '',
    }
  },

  methods: {
    authenticate() {
      let credentials = {
        password: this.password,
      }

      if (this.isEmail(this.emailOrUser)) {
        credentials['email'] = this.emailOrUser
      } else {
        credentials['username'] = this.emailOrUser
      }

      this.$api
        .authenticate(credentials)
        .then(loged => {
          if (loged) {
            window.location = this.$routes.admin
          } else {
            // do something if loged is false
          }
        })
        .catch(error => {
          console.error(error)
        })
    },

    isEmail: string => email_re.test(string),
  },

  mounted() {
    this.authenticate()
  },
}
</script>
