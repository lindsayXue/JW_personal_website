<template>
  <div class="pub-list lightGrey">
    <v-dialog v-model="dialog" width="600" persistent>
      <template v-slot:activator="{ on }" v-if="$store.state.isAdmin">
        <v-btn flat light small absolute right color="tertiary" fab v-on="on">
          <i class="fas fa-plus"></i>
        </v-btn>
      </template>
      <PublicationHandler v-on:closeDialog="closeDialog"/>
    </v-dialog>
    <v-alert
      :value="true"
      type="error"
      class="alert my-4"
      v-if="$store.state.isAdmin && (!pubData || pubData.length === 0)"
    >No data yet!</v-alert>
    <v-sheet class="lightGrey my-4" v-for="(item, key) in pubShow" :key="item.id">
      <div class="pub-title my-1 tertiary--text">
        {{item.title}}
        <v-btn
          v-if="$store.state.isAdmin"
          fab
          flat
          dark
          small
          color="tertiary"
          @click="deleteItem(item._id)"
        >
          <i class="fas fa-times"></i>
        </v-btn>
      </div>
      <div class="pub-type secondary white--text d-inline-block pa-1">{{item.catagory}}</div>
      <div class="pub-authors detail my-1">
        <span class="pr-2" v-for="(author, index) in item.authors" :key="index">{{author}}</span>
      </div>
      <div class="pub-info detail">{{item.info}}</div>
      <div class="pub-year">Publication year: {{item.year | moment("YYYY") }}</div>
      <v-divider class="my-2" :key="key"></v-divider>
    </v-sheet>
  </div>
</template>
<script>
import PublicationHandler from '../admin/PublicationHandler'
import ProfileService from '../../services/Profile'

export default {
  props: [
    'pubData',
    'searchData'
  ],
  components: {
    PublicationHandler
  },
  data () {
    return {
      pubShow: [],
      dialog: false
    }
  },
  watch: {
    pubData: function () {
      this.pubShow = this.pubData
    },
    searchData: function (val) {
      if (!val) {
        this.pubShow = this.pubData
      } else {
        this.pubShow = this.pubData.filter(pub => pub._id === val)
      }
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    },
    async deleteItem (id) {
      try {
        await ProfileService.deletepublication(id)
        await this.$store.dispatch('getProfile')
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
      }
    },
    sorted () {
      this.pubShow.reverse()
    }
  },
  mounted () {
    this.pubShow = this.pubData
  },
}
</script>
<style scoped>
.pub-list {
  padding: 1rem 5vw;
  overflow-wrap: break-word;
}
.pub-title {
  font-size: 1.4rem;
}
.pub-type {
  border-radius: 5px;
}
</style>
