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
import Axios from 'axios'

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
      let data = { email: null, password: this.password, username: null }
      if (this.isEmail(this.emailOrUser)) {
        data.email = this.emailOrUser
      } else {
        data.username = this.emailOrUser
      }
      Axios.post('/puzzle/login/', data)
        .then(response => {
          const { data } = response
          const { token } = data
          window.localStorage.setItem('puzzle_token', token)
          window.location = '/puzzle/admin/'
        })
        .catch(error => {
          console.error(error)
        })
    },

    isEmail: string => email_re.test(string),
  },
}
</script>
