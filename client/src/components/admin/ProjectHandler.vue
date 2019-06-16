<template>
  <div class="project-handler">
    <v-card>
      <v-card-title class="headline tertiary white--text" primary-title>Project</v-card-title>
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
                  v-model="form.name"
                  :error="!!$store.state.errors.projectName"
                  :error-messages="$store.state.errors.projectName? $store.state.errors.projectName.msg  : ''"
                  :disabled="isLoading"
                  label="Name"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="form.detail"
                  :error="!!$store.state.errors.projectDetail"
                  :error-messages="$store.state.errors.projectDetail? $store.state.errors.projectDetail.msg  : ''"
                  :disabled="isLoading"
                  label="Detail"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="form.imgURL"
                  :error="!!$store.state.errors.projectImage"
                  :error-messages="$store.state.errors.projectImage? $store.state.errors.projectImage.msg  : ''"
                  :disabled="isLoading"
                  label="Project image URL"
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
      form: {
        name: '',
        detail: '',
        imgURL: ''
      },
      isLoading: false
    }
  },
  methods: {
    async create () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        const { name, detail, imgURL } = this.form
        const newProject = {
          projectName: name,
          projectDetail: detail,
          projectImage: imgURL
        }
        await ProfileService.createproject(newProject)
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