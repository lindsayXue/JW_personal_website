<template>
  <div id="projects-list">
    <h1 class="primary--text font-weight-regular mb-4">
      {{title}}
      <v-dialog v-model="dialog" width="600" v-if="$store.state.isAdmin" persistent>
        <template v-slot:activator="{ on }">
          <v-btn flat light color="tertiary" fab v-on="on">
            <i class="fas fa-plus"></i>
          </v-btn>
        </template>
        <ProjectHandler v-on:closeDialog="closeDialog" :isCreating="true"/>
      </v-dialog>
    </h1>
    <v-layout class="list-content" row wrap justify-center>
      <v-flex md10 xs11>
        <v-dialog v-model="dialogProject" max-width="600">
          <template v-slot:activator="{ on }">
            <v-card
              class="project-card mb-4"
              v-for="item in projectsData"
              :key="item._id"
              hover
              v-on="on"
              @click="reviewProject(item)"
            >
              <v-dialog v-model="dialogEdit" width="600" v-if="$store.state.isAdmin" persistent>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    flat
                    dark
                    small
                    color="tertiary"
                    v-if="$store.state.isAdmin"
                    class="mr-4"
                    v-on="on"
                  >
                    <i class="fas fa-edit"></i>
                  </v-btn>
                </template>
                <ProjectHandler
                  v-on:closeDialog="closeDialogEdit"
                  :isCreating="false"
                  :editItem="item"
                />
              </v-dialog>
              <v-btn
                fab
                flat
                dark
                small
                color="primary"
                @click.stop="deleteItem(item._id)"
                absolute
                right
                v-if="$store.state.isAdmin"
              >
                <i class="fas fa-times"></i>
              </v-btn>
              <v-layout wrap>
                <v-flex xs4 class="hidden-sm-and-down">
                  <v-img class="secondary" height="200" width="200" :src="item.imgURL">
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="white"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-flex>
                <v-flex sm7 xs11>
                  <v-card-title class="headline tertiary--text">{{item.name}}</v-card-title>
                  <v-card-text class="detail" v-html="item.detail.slice(0, 100) + '...'"></v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </template>
          <v-card class="project-card">
            <v-card-title
              class="headline tertiary--text"
              primary-title
            >{{selectProject? selectProject.name : ''}}</v-card-title>

            <v-card-text class="detail" v-html="selectProject? selectProject.detail:''"></v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="dialogProject = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import ProjectHandler from '../admin/ProjectHandler'
import ProfileService from '../../services/Profile'

export default {
  props: ['title', 'projectsData'],
  components: {
    ProjectHandler
  },
  data () {
    return {
      dialog: false,
      dialogProject: false,
      dialogEdit: false,
      selectProject: null

    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    },
    closeDialogEdit () {
      this.dialogEdit = false
    },
    reviewProject (item) {
      this.selectProject = item
    },
    async deleteItem (id) {
      try {
        await ProfileService.deleteproject(id)
        this.$store.dispatch('getProfile')
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
      }
    }
  }
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
