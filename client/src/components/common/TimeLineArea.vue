<template>
  <div id="timeline-area">
    <h1 class="tertiary--text font-weight-regular mb-4 text-capitalize">
      {{title}}
      <v-dialog v-model="dialog" width="600" v-if="$store.state.isAdmin" persistent>
        <template v-slot:activator="{ on }">
          <v-btn flat light color="tertiary" fab v-on="on">
            <i class="fas fa-plus"></i>
          </v-btn>
        </template>
        <TimeLineHandler v-on:closeDialog="closeDialog" :title="title"/>
      </v-dialog>
    </h1>
    <div class="content primary--text">
      <v-alert
        :value="true"
        type="error"
        class="alert my-4"
        v-if="$store.state.isAdmin && (!!timelineData && timelineData.length === 0)"
      >No data yet!</v-alert>
      <v-layout
        v-for="item in timelineData"
        :key="item._id"
        mb-4
        row
        wrap
        justify-center
        align-start
      >
        <v-flex sm4 xs11>
          <p class="detail">{{item.start}} - {{item.end}}</p>
        </v-flex>
        <v-flex sm7 xs11>
          <p class="font-weight-bold">{{title === 'education'? item.degree : item.position}}</p>
          <p class="detail">{{title === 'education'? item.school : item.company}}</p>
          <p class="detail">
            <span class="tertiary--text">
              <i class="fas fa-map-marker-alt"></i>
            </span>
            {{item.location.city}}, {{item.location.country}}
          </p>
        </v-flex>
        <v-flex xs1 v-if="$store.state.isAdmin">
          <v-btn flat small fab color="tertiary" @click="deleteItem(item._id)">
            <i class="fas fa-times"></i>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import ProfileService from '../../services/Profile'
import TimeLineHandler from '../admin/TimeLineHandler'

export default {
  props: ['title', 'timelineData'],
  components: {
    TimeLineHandler
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
        await ProfileService[`delete${this.title}`](id)
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
#timeline-area {
  padding: 2rem 5vw;
}
.content {
  padding: 0 5vw;
  font-size: 1.2rem;
  line-height: 1.5rem;
}
</style>
