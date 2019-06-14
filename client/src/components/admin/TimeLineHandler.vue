<template>
  <div class="timeline-handler">
    <v-card>
      <v-card-title
        class="headline tertiary white--text"
        primary-title
      >{{title.charAt(0).toUpperCase() + title.slice(1)}}</v-card-title>
      <v-card-text>
        <v-alert
          :value="true"
          type="error"
          v-if="!!$store.state.errors.server"
        >{{$store.state.errors.server.msg}}</v-alert>
        <v-form ref="form">
          <v-container>
            <v-layout wrap>
              <v-flex xs12 class="text-xs-center">
                <v-progress-circular v-if="isLoading" :width="3" color="secondary" indeterminate></v-progress-circular>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="form.start"
                  :error="!!$store.state.errors.start"
                  :error-messages="$store.state.errors.start? $store.state.errors.start.msg  : ''"
                  :disabled="isLoading"
                  label="Start"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="form.end"
                  :error="!!$store.state.errors.end"
                  :error-messages="$store.state.errors.end? $store.state.errors.end.msg  : ''"
                  :disabled="isLoading"
                  label="End"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="form.degree"
                  :error="!!$store.state.errors.degree"
                  :error-messages="$store.state.errors.degree? $store.state.errors.degree.msg  : ''"
                  :disabled="isLoading"
                  :label="title==='education'? 'Degree':'Position'"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.school"
                  :error="!!$store.state.errors.school"
                  :error-messages="$store.state.errors.school? $store.state.errors.school.msg  : ''"
                  :disabled="isLoading"
                  :label="title==='education'? 'School':'Company'"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="form.location.city"
                  :error="!!$store.state.errors.city"
                  :error-messages="$store.state.errors.city? $store.state.errors.city.msg  : ''"
                  :disabled="isLoading"
                  label="City"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="form.location.country"
                  :error="!!$store.state.errors.country"
                  :error-messages="$store.state.errors.country? $store.state.errors.country.msg  : ''"
                  :disabled="isLoading"
                  label="Country"
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
        <v-btn color="primary" flat @click="close">Back</v-btn>
        <v-btn color="tertiary" flat @click="create">Create</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import ProfileService from '../../services/Profile'

export default {
  props: ['title'],
  data () {
    return {
      form: {
        start: '',
        end: '',
        degree: '',
        school: '',
        location: {
          city: '',
          country: ''
        }
      },
      isLoading: false
    }
  },
  methods: {
    async create () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        const newData = this.form
        const res = await ProfileService[`create${this.title}`](newData)
        this.$store.dispatch('getProfile')
        this.$emit('closeDialog')
        this.isLoading = false
        this.$refs.form.reset()
      } catch (err) {
        this.$store.dispatch('setErrors', err.response.data.errors)
        this.isLoading = false
      }
    },
    close () {
      this.$emit('closeDialog')
      this.$refs.form.reset()
      this.$store.dispatch('setErrors', null)
    }
  }
}
</script>
<style scoped>
</style>

