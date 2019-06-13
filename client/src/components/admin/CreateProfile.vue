<template>
  <div class="create-profile">
    <v-card>
      <v-card-title class="headline tertiary white--text" primary-title>Profile</v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-layout wrap>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="firstName"
                  :error="!!$store.state.errors.firstName"
                  :error-messages="$store.state.errors.firstName? $store.state.errors.firstName.msg  : ''"
                  label="First name"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="lastName"
                  :error="!!$store.state.errors.lastName"
                  :error-messages="$store.state.errors.lastName? $store.state.errors.lastName.msg  : ''"
                  label="Last name"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="email"
                  :error="!!$store.state.errors.email"
                  :error-messages="$store.state.errors.email? $store.state.errors.email.msg  : ''"
                  type="email"
                  label="Email"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="city"
                  :error="!!$store.state.errors.city"
                  :error-messages="$store.state.errors.city? $store.state.errors.city.msg  : ''"
                  label="City"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="country"
                  :error="!!$store.state.errors.country"
                  :error-messages="$store.state.errors.country? $store.state.errors.country.msg  : ''"
                  label="Country"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="currentTitle"
                  :error="!!$store.state.errors.currentTitle"
                  :error-messages="$store.state.errors.currentTitle? $store.state.errors.currentTitle.msg  : ''"
                  label="Current title"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="imgURL"
                  :error="!!$store.state.errors.imgURL"
                  :error-messages="$store.state.errors.imgURL? $store.state.errors.imgURL.msg  : ''"
                  label="LOGO Image URL"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="facebook"
                  :error="!!$store.state.errors.facebook"
                  :error-messages="$store.state.errors.facebook? $store.state.errors.facebook.msg  : ''"
                  label="Facebook URL"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="linkedin"
                  :error="!!$store.state.errors.linkedin"
                  :error-messages="$store.state.errors.linkedin? $store.state.errors.linkedin.msg  : ''"
                  label="LinkedIn URL"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="github"
                  :error="!!$store.state.errors.github"
                  :error-messages="$store.state.errors.github? $store.state.errors.github.msg  : ''"
                  label="GitHub URL"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="youtube"
                  :error="!!$store.state.errors.youtube"
                  :error-messages="$store.state.errors.youtube? $store.state.errors.youtube.msg  : ''"
                  label="Youtube URL"
                  clearable
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="backClick">Back</v-btn>
        <v-btn color="tertiary" flat @click="createProfile">Create</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valid: false,
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      country: '',
      currentTitle: '',
      imgURL: '',
      facebook: '',
      linkedin: '',
      github: '',
      youtube: ''
    }
  },
  methods: {
    createProfile (e) {
      e.preventDefault()
      const newProfile = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        city: this.city,
        country: this.country,
        currentTitle: this.currentTitle,
        imgURL: this.imgURL,
        facebook: this.facebook,
        linkedin: this.linkedin,
        github: this.github,
        youtube: this.youtube
      }

      this.$store.dispatch('createProfile', newProfile)
    },
    backClick () {
      this.$refs.form.reset()
      this.$store.dispatch('setErrors', null)
      this.$emit('closeDialog')
    }
  },
}
</script>
<style scoped>
</style>

