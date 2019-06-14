<template>
  <div class="catagory-handler">
    <v-card>
      <v-card-title class="headline tertiary white--text" primary-title>Catagory</v-card-title>
      <v-card-text>
        <v-alert
          :value="true"
          type="error"
          v-if="!!$store.state.errors.server"
        >{{$store.state.errors.server.msg}}</v-alert>
        <v-form ref="form">
          <v-container>
            <v-layout wrap>
              <v-flex xs11 class="text-xs-center">
                <v-progress-circular v-if="isLoading" :width="3" color="secondary" indeterminate></v-progress-circular>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="catagoryName"
                  :disabled="isLoading"
                  :error="!!$store.state.errors.catagoryName"
                  :error-messages="$store.state.errors.catagoryName? $store.state.errors.catagoryName.msg  : ''"
                  label="Catagory name"
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
        <v-btn color="tertiary" flat @click="edit">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import BlogService from '../../services/Blog'

export default {
  props: ['catagoryEdit'],
  data () {
    return {
      catagoryName: '',
      isLoading: true
    }
  },
  methods: {
    async edit () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        await BlogService.editCatagory({
          catagoryId: this.catagoryEdit._id,
          catagoryName: this.catagoryName
        })
        this.isLoading = false
        this.$emit('closeDialog')
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
        this.isLoading = false
      }
    },
    close () {
      this.$emit('closeDialog')
      this.$store.dispatch('setErrors', null)
      this.catagoryName = this.catagoryEdit.name
    },
  },
  mounted () {
    this.catagoryName = this.catagoryEdit.name
    this.isLoading = false
  },
}
</script>
<style scoped>
</style>

