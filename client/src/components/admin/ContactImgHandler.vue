<template>
  <div class="profile-handler">
    <v-card>
      <v-card-title class="headline tertiary white--text" primary-title>Contact Image</v-card-title>
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
                  v-model="imgURL"
                  :disabled="isLoading"
                  label="Contact image URL"
                  :error="!!$store.state.errors.contactImg"
                  :error-messages="$store.state.errors.contactImg? $store.state.errors.contactImg.msg  : ''"
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
import LayoutService from '../../services/Layout'

export default {
  data () {
    return {
      imgURL: '',
      isLoading: true
    }
  },
  methods: {
    async edit () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        await LayoutService.editContactImg({
          contactImg: this.imgURL
        })
        this.$emit('updateImg', this.imgURL)
        this.isLoading = false
        this.$emit('closeDialog')
      } catch (err) {
        this.$store.dispatch('setErrors', err.response.data.errors)
        this.isLoading = false
      }
    },
    async close () {
      this.$emit('closeDialog')
      this.$store.dispatch('setErrors', null)
      try {
        const res = await LayoutService.getLayout()
        if (res.data) {
          this.imgURL = res.data.contactImgURL
        } else {
          this.$refs.form.reset()
        }
        this.isLoading = false
      } catch (err) {
        this.$store.dispatch('setErrors', err.response.data.errors)
      }
    },
  },
  async mounted () {
    try {
      const res = await LayoutService.getLayout()
      if (res.data) {
        this.imgURL = res.data.contactImgURL
      }
      this.isLoading = false
    } catch (err) {
      this.$store.dispatch('setErrors', err.response.data.errors)
    }
  },
}
</script>
<style scoped>
</style>

