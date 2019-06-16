<template>
  <v-layout id="admin-login" row wrap justify-center align-center>
    <v-flex xs11 class="title">
      <h1 class="text-capitalize tertiary--text">admin login</h1>
    </v-flex>
    <v-flex md6 xs11 v-if="$store.state.isAdmin">You already logged in</v-flex>
    <v-flex md6 xs11 class="login-form" v-if="!$store.state.isAdmin">
      <v-form ref="form">
        <v-container>
          <v-layout wrap justify-center>
            <v-flex xs12 class="text-xs-center">
              <v-progress-circular v-if="isLoading" :width="3" color="secondary" indeterminate></v-progress-circular>
            </v-flex>
            <v-flex xs11>
              <v-text-field
                v-model="username"
                :error="!!$store.state.errors.username"
                :error-messages="$store.state.errors.username? $store.state.errors.username.msg  : ''"
                :disabled="isLoading"
                label="Username"
                clearable
              ></v-text-field>
            </v-flex>
            <v-flex xs11>
              <v-text-field
                v-model="password"
                :error="!!$store.state.errors.password"
                :error-messages="$store.state.errors.password? $store.state.errors.password.msg  : ''"
                :disabled="isLoading"
                label="Password"
                type="password"
                clearable
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-btn color="tertiary" dark @click="login">Login</v-btn>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    login () {
      this.$store.dispatch('setErrors', null)
      this.$store.dispatch('loginAdmin', {
        username: this.username,
        password: this.password
      }).then(() => {
        if (Object.keys(this.$store.state.errors).length === 0) {
          this.$router.push('/')
        }
      })
    }
  },
}
</script>
<style scoped>
.title {
  padding: 2rem 5vw;
}
h1 {
  text-align: center;
}
.login-form {
  border: 2px solid var(--v-tertiary-base);
}
</style>

