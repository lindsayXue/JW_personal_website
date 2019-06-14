<template>
  <div class="interests-handler">
    <v-card>
      <v-card-title class="headline tertiary white--text" primary-title>Interests</v-card-title>
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
              <v-flex xs11>
                <v-text-field
                  v-model="interest"
                  :error="!!$store.state.errors.interest"
                  :error-messages="$store.state.errors.interest? $store.state.errors.interest.msg  : ''"
                  :disabled="isLoading"
                  label="Interest"
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
  data () {
    return {
      interest: '',
      isLoading: false
    }
  },
  methods: {
    async create () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        const interest = this.interest
        await ProfileService.createinterest({ interest })
        this.$store.dispatch('getProfile')
        this.$emit('closeDialog')
        this.isLoading = false
        this.$refs.form.reset()
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
        this.isLoading = false
      }
    },
    close () {
      this.$emit('closeDialog')
      this.$refs.form.reset()
      this.$store.dispatch('setErrors', null)
    }
  },
}
</script>
<style scoped>
</style>
