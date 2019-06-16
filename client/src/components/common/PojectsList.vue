<template>
  <div id="projects-list">
    <h1 class="primary--text font-weight-regular mb-4">
      {{title}}
      <v-dialog v-model="dialog" width="600" v-if="$store.state.isAdmin">
        <template v-slot:activator="{ on }">
          <v-btn flat light color="tertiary" fab v-on="on">
            <i class="fas fa-plus"></i>
          </v-btn>
        </template>
        <ProjectHandler v-on:closeDialog="closeDialog"/>
      </v-dialog>
    </h1>
    <div class="list-content">
      <v-alert
        :value="true"
        type="error"
        class="alert my-4"
        v-if="$store.state.isAdmin && (!projectsData || projectsData.length === 0)"
      >No data yet!</v-alert>
      <v-card class="project-card mb-4" v-for="item in projectsData" :key="item._id" hover>
        <v-btn
          fab
          flat
          dark
          small
          color="tertiary"
          @click="deleteItem(item._id)"
          absolute
          right
          v-if="$store.state.isAdmin"
        >
          <i class="fas fa-times"></i>
        </v-btn>
        <v-layout>
          <v-flex xs4 class="hidden-md-and-down">
            <v-img class="secondary" height="250" width="250" :src="item.imgURL"></v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title class="headline tertiary--text">{{item.name}}</v-card-title>
            <v-card-text class="detail">{{item.detail}}</v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
  </div>
</template>
<script>
import ProjectHandler from '../admin/ProjectHandler'
import ProfileService from '../../services/Profile'

export default {
  props: {
    title: String,
    projectsData: Array
  },
  components: {
    ProjectHandler
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    },
    async deleteItem (id) {
      try {
        await ProfileService.deleteproject(id)
        await this.$store.dispatch('getProfile')
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
      }
    }
  },
}
</script>
<style scoped>
#projects-list {
  padding: 2rem 5vw;
}
.list-content {
  padding: 0 5vw;
}
.project-card {
  overflow-wrap: break-word;
}
</style>
