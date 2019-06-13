<template>
  <div class="profile-handler">
    <v-card>
      <v-card-title class="headline tertiary white--text" primary-title>Profile</v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-layout wrap>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="form.firstName"
                  :error="!!$store.state.errors.firstName"
                  :error-messages="$store.state.errors.firstName? $store.state.errors.firstName.msg  : ''"
                  label="First name"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="form.lastName"
                  :error="!!$store.state.errors.lastName"
                  :error-messages="$store.state.errors.lastName? $store.state.errors.lastName.msg  : ''"
                  label="Last name"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="form.email"
                  :error="!!$store.state.errors.email"
                  :error-messages="$store.state.errors.email? $store.state.errors.email.msg  : ''"
                  type="email"
                  label="Email"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="form.location.city"
                  :error="!!$store.state.errors.city"
                  :error-messages="$store.state.errors.city? $store.state.errors.city.msg  : ''"
                  label="City"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="form.location.country"
                  :error="!!$store.state.errors.country"
                  :error-messages="$store.state.errors.country? $store.state.errors.country.msg  : ''"
                  label="Country"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="form.currentTitle"
                  :error="!!$store.state.errors.currentTitle"
                  :error-messages="$store.state.errors.currentTitle? $store.state.errors.currentTitle.msg  : ''"
                  label="Current title"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.imgURL"
                  :error="!!$store.state.errors.imgURL"
                  :error-messages="$store.state.errors.imgURL? $store.state.errors.imgURL.msg  : ''"
                  label="LOGO Image URL"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.socialLinks.facebook"
                  :error="!!$store.state.errors.facebook"
                  :error-messages="$store.state.errors.facebook? $store.state.errors.facebook.msg  : ''"
                  label="Facebook URL"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.socialLinks.linkedin"
                  :error="!!$store.state.errors.linkedin"
                  :error-messages="$store.state.errors.linkedin? $store.state.errors.linkedin.msg  : ''"
                  label="LinkedIn URL"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.socialLinks.github"
                  :error="!!$store.state.errors.github"
                  :error-messages="$store.state.errors.github? $store.state.errors.github.msg  : ''"
                  label="GitHub URL"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.socialLinks.youtube"
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

      <v-card-actions v-if="!$store.state.profile">
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="close">Back</v-btn>
        <v-btn color="tertiary" flat @click="createProfile">Create</v-btn>
      </v-card-actions>
      <v-card-actions v-if="!!$store.state.profile">
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="closeEdit">Back</v-btn>
        <v-btn color="tertiary" flat @click="editProfile">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import ProfileService from '../../services/Profile'

export default {
  data () {
    return {
      valid: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        location: {
          city: '',
          country: ''
        },
        currentTitle: '',
        imgURL: '',
        socialLinks: {
          facebook: '',
          linkedin: '',
          github: '',
          youtube: ''
        }
      },
      isLoading: false
    }
  },
  methods: {
    createProfile () {
      this.$store.dispatch('setErrors', null)

      this.$store.dispatch('createProfile', this.profile).then(() => {
        if (Object.keys(this.$store.state.errors).length === 0) {
          this.$emit('closeDialog')
        }
      })
    },
    close () {
      this.$emit('closeDialog')
      this.$refs.form.reset()
      this.$store.dispatch('setErrors', null)
    },
    async closeEdit () {
      this.$emit('closeDialog')
      try {
        const res = await ProfileService.getProfile()
        this.form = res.data
      } catch (err) {
        console.log(err)
      }
    },
    editProfile () {
      this.$store.dispatch('setErrors', null)

      this.$store.dispatch('editProfile', this.form).then(() => {
        if (Object.keys(this.$store.state.errors).length === 0) {
          this.$emit('closeDialog')
        }
      })
    }
  },
  async mounted () {
    try {
      const res = await ProfileService.getProfile()
      this.form = res.data
    } catch (err) {
      console.log(err)
    }
  },
}
</script>
<style scoped>
</style>

