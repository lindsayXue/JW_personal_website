<template>
  <div class="pub-list lightGrey">
    <v-dialog v-model="dialogCreate" width="600" persistent>
      <template v-slot:activator="{ on }" v-if="$store.state.isAdmin">
        <v-btn flat light small absolute right color="tertiary" fab v-on="on">
          <i class="fas fa-plus"></i>
        </v-btn>
      </template>
      <PublicationHandler v-on:closeDialog="closeDialog" :isCreating="true"/>
    </v-dialog>
    <v-alert
      :value="true"
      type="error"
      class="alert my-4"
      v-if="$store.state.isAdmin && (!pubData || pubData.length === 0)"
    >No data yet!</v-alert>
    <v-progress-linear v-if="isLoading" :indeterminate="true" color="secondary" height="3"></v-progress-linear>
    <v-dialog v-model="dialogEdit" width="600" v-if="$store.state.isAdmin" persistent lazy>
      <PublicationHandler
        v-on:closeDialog="closeDialogEdit"
        :isCreating="false"
        :editItem="editItem"
      />
    </v-dialog>
    <v-sheet class="lightGrey my-4" v-for="(item, index) in pubShow" :key="item._id">
      <div class="pub-title my-1 tertiary--text">
        {{item.title}}
        <v-btn
          v-if="$store.state.isAdmin"
          fab
          flat
          dark
          small
          color="tertiary"
          @click="editClick(item)"
        >
          <i class="fas fa-edit"></i>
        </v-btn>
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
      <div class="pub-year detail">{{item.year}}</div>
      <v-divider class="my-2" :key="index"></v-divider>
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
      dialogCreate: false,
      dialogEdit: false,
      editItem: null,
      isLoading: true
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
      this.dialogCreate = false
    },
    closeDialogEdit () {
      this.editItem = null
      this.dialogEdit = false
    },
    editClick (item) {
      this.editItem = item
      this.dialogEdit = true
    },
    async deleteItem (id) {
      this.isLoading = true
      try {
        await ProfileService.deletepublication(id)
        await this.$store.dispatch('getProfile')
        this.isLoading = false
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
        this.isLoading = false
      }
    },
    sorted () {
      this.pubShow.reverse()
    }
  },
  mounted () {
    this.pubShow = this.pubData
    this.isLoading = false
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
