<template>
  <div id="list-area">
    <h1 class="font-weight-regular mb-4">
      {{title}}
      <v-dialog v-model="dialog" width="600" v-if="$store.state.isAdmin" persistent>
        <template v-slot:activator="{ on }">
          <v-btn flat light color="tertiary" fab v-on="on">
            <i class="fas fa-plus"></i>
          </v-btn>
        </template>
        <InterestsHandler v-on:closeDialog="closeDialog"/>
      </v-dialog>
    </h1>
    <v-list dense>
      <v-alert
        :value="true"
        type="error"
        class="alert my-4"
        v-if="$store.state.isAdmin && (!listData || listData.length === 0)"
      >No data yet!</v-alert>
      <v-list-tile v-for="item in listData" :key="item._id">
        <v-list-tile-action>
          <v-list-tile-title class="list-icon secondary--text">|</v-list-tile-title>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="detail" v-html="item.title"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="$store.state.isAdmin">
          <v-btn fab flat dark small color="tertiary" @click="deleteItem(item._id)">
            <i class="fas fa-times"></i>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script>
import InterestsHandler from '../admin/InterestsHandler'
import ProfileService from '../../services/Profile'

export default {
  props: ['title', 'listData'],
  components: {
    InterestsHandler
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
        await ProfileService.deleteinterest(id)
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
.list-icon {
  font-size: 1.6rem;
}
</style>
