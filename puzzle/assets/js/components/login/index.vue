<template>
  <div class="container">
    <div class="login">
      <form class="form">
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

        <div v-if="error" class="field">
          <p class="message">
            {{ message }}
          </p>
        </div>

        <div class="field">
          <input type="submit" @click.prevent="authenticate" value="Login" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const email_re = /\S+@\S+\.\S+/

export default {
  data() {
    return {
      emailOrUser: '',
      error: false,
      message: '',
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

      this.$api.token
        .post(credentials)
        .then(loged => {
          if (loged) {
            window.location = this.$routes.admin
          } else {
            this.message = 'Invalid Credentials, please try again.'
            this.error = true
          }
        })
        .catch(error => {
          console.error(error)
        })
    },

    isEmail: string => email_re.test(string),
  },
}
</script>
