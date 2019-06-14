<template>
  <div class="desc-handler">
    <v-card>
      <v-card-title
        class="headline tertiary white--text"
        primary-title
      >{{title.toUpperCase()}} Description</v-card-title>
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
                  v-model="description"
                  :disabled="isLoading"
                  label="Description"
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
        <v-btn color="primary" flat @click="closeEdit">Back</v-btn>
        <v-btn color="tertiary" flat @click="editDesc">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import LayoutService from '../../services/Layout'

export default {
  props: ['title'],
  data () {
    return {
      description: '',
      isLoading: true
    }
  },
  methods: {
    async editDesc () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        await LayoutService[`edit${this.title}Desc`]({
          description: this.description
        })
        this.$emit('updateDesc', this.description)
        this.isLoading = false
        this.$emit('closeDialog')
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
        this.isLoading = false
      }
    },
    async closeEdit () {
      this.$emit('closeDialog')
      this.$store.dispatch('setErrors', null)
      try {
        const res = await LayoutService.getLayout()
        if (res.data) {
          this.description = res.data[`${this.title}Desc`]
        } else {
          this.$refs.form.reset()
        }
        this.isLoading = false
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
        this.isLoading = false
      }
    },
  },
  async mounted () {
    try {
      const res = await LayoutService.getLayout()
      if (res.data) {
        this.description = res.data[`${this.title}Desc`]
      }
      this.isLoading = false
    } catch (err) {
      if (err.response.data.errors) {
        this.$store.dispatch('setErrors', err.response.data.errors)
      }
    }
  },
}
</script>
<style scoped>
</style>

