<template>
  <div class="project-handler">
    <v-card>
      <v-card-title class="headline tertiary white--text" primary-title>Publication</v-card-title>
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
                  v-model="form.title"
                  :error="!!$store.state.errors.title"
                  :error-messages="$store.state.errors.title? $store.state.errors.title.msg  : ''"
                  :disabled="isLoading"
                  label="Title"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="form.catagory"
                  :error="!!$store.state.errors.catagory"
                  :error-messages="$store.state.errors.catagory? $store.state.errors.catagory.msg  : ''"
                  :disabled="isLoading"
                  label="Catagory"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="form.authors"
                  :error="!!$store.state.errors.authors"
                  :error-messages="$store.state.errors.authors? $store.state.errors.authors.msg  : ''"
                  :disabled="isLoading"
                  label="Author1, Author2..."
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="form.info"
                  :error="!!$store.state.errors.info"
                  :error-messages="$store.state.errors.info? $store.state.errors.info.msg  : ''"
                  :disabled="isLoading"
                  label="Info"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="form.year"
                  :error="!!$store.state.errors.year"
                  :error-messages="$store.state.errors.year? $store.state.errors.year.msg  : ''"
                  :disabled="isLoading"
                  label="Year"
                  clearable
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions v-if="isCreating">
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="close">Back</v-btn>
        <v-btn color="tertiary" flat @click="create">Create</v-btn>
      </v-card-actions>
      <v-card-actions v-if="!isCreating">
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="closeEdit">Back</v-btn>
        <v-btn color="tertiary" flat @click="edit">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import ProfileService from '../../services/Profile'

export default {
  props: ['isCreating', 'editItem'],
  data () {
    return {
      form: {
        title: '',
        catagory: '',
        authors: '',
        info: '',
        year: ''
      },
      isLoading: false
    }
  },
  methods: {
    async create () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        await ProfileService.createpublication(this.form)
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
    async edit () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        await ProfileService.editpublication({ ...this.form, id: this.editItem._id })
        this.$store.dispatch('getProfile')
        this.$emit('closeDialog')
        this.isLoading = false
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
    },
    closeEdit () {
      this.$emit('closeDialog')
      this.resetEditForm()
      this.$store.dispatch('setErrors', null)
    },
    resetEditForm () {
      this.form.title = this.editItem.title
      this.form.catagory = this.editItem.catagory
      this.form.authors = this.editItem.authors.join(',')
      this.form.info = this.editItem.info
      this.form.year = this.editItem.year
    }
  },
  mounted () {
    if (!this.isCreating) {
      this.resetEditForm()
    }
  },
}
</script>
<style scoped>
</style>
