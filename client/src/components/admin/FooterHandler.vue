<template>
  <div class="profile-handler">
    <v-card>
      <v-card-title class="headline tertiary white--text" primary-title>Footer</v-card-title>
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
                <v-text-field v-model="footerEdit" :disabled="isLoading" label="Footer" clearable></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="closeEdit">Back</v-btn>
        <v-btn color="tertiary" flat @click="editFooter">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import LayoutService from '../../services/Layout'

export default {
  props: ['footer'],
  data () {
    return {
      footerEdit: '',
      isLoading: true
    }
  },
  methods: {
    async editFooter () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        await LayoutService.editFooter({
          footer: this.footerEdit
        })
        this.isLoading = false
        this.$emit('closeDialog', true)
      } catch (err) {
        this.$store.dispatch('setErrors', err.response.data.errors)
      }
    },
    closeEdit () {
      this.$emit('closeDialog', false)
      this.$store.dispatch('setErrors', null)
    },
  },
  mounted () {
    this.footerEdit = this.footer
    this.isLoading = false
  },
}
</script>
<style scoped>
</style>

