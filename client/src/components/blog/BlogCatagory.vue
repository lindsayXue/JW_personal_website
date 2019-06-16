<template>
  <div class="blog-catagory">
    <h1 class="white--text font-weight-regular ma-2">
      Catagory
      <v-btn dark flat small @click="addClick" v-if="!adding ">
        <i class="fas fa-plus"></i>
      </v-btn>
      <v-btn dark flat small @click="closeClick" v-if="adding">
        <i class="fas fa-times"></i>
      </v-btn>
    </h1>
    <v-progress-linear v-if="isLoading" :indeterminate="true" color="secondary" height="3"></v-progress-linear>
    <v-list dense class="tertiary textGrey--text">
      <v-alert
        :value="true"
        type="error"
        class="alert my-4"
        v-if="!catagoryData || catagoryData.length === 0"
      >No data yet!</v-alert>
      <template v-for="item in catagoryData">
        <v-list-tile
          :class="item._id === $store.state.route.query.cataId? 'active-list': ''"
          @click="selectClick(item)"
          :key="item._id"
        >
          <v-list-tile-avatar>
            <v-dialog v-model="dialog" width="600">
              <template v-slot:activator="{ on }">
                <v-btn flat fab dark small v-on="on">
                  <i class="fas fa-edit"></i>
                </v-btn>
              </template>
              <CatagoryHandler v-on:closeDialog="closeDialog" :catagoryEdit="item"/>
            </v-dialog>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="content">
              <span class="list-icon secondary--text font-weight-bold pr-2">|</span>
              {{item.name}}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn flat dark small fab>
              <i class="fas fa-times" @click="deleteItem(item._id)"></i>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
      <v-list-tile
        :class="!$store.state.route.query.catagory? 'active-list': ''"
        @click="selectClick(null)"
      >
        <v-list-tile-content>
          <v-list-tile-title class="content">
            <span class="list-icon secondary--text font-weight-bold pr-2">|</span>
            ALL
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-form class="pa-2" ref="form" v-if="adding">
      <v-text-field
        label="Catagory"
        v-model="catagoryName"
        :error="!!$store.state.errors.catagoryName"
        :error-message="$store.state.errors.catagoryName? $store.state.errors.catagoryName.msg : ''"
        dark
        required
      ></v-text-field>
      <v-btn color="primary" dark small @click="addCatagory">Create</v-btn>
    </v-form>
  </div>
</template>
<script>
import CatagoryHandler from '../admin/CatagoryHandler'
import BlogService from '../../services/Blog'

export default {
  props: ['catagoryData'],
  components: {
    CatagoryHandler
  },
  data () {
    return {
      adding: false,
      editing: false,
      catagoryName: '',
      dialog: false,
      isLoading: false
    }
  },
  methods: {
    addClick () {
      this.adding = true
    },
    closeClick () {
      this.adding = false
      this.$refs.form.reset()
      this.$store.dispatch('setErrors', null)
    },
    closeDialog (update) {
      this.dialog = false
      if (update) {
        this.isLoading = true
        this.$emit('updateBlog')
        this.isLoading = false
        return
      }
      this.isLoading = false
    },
    selectClick (cata) {
      if (cata) {
        this.$router.push({ query: { catagory: cata.name, cataId: cata._id } })
      } else {
        this.$router.push({ query: { catagory: null, cataId: null } })
      }
    },
    async addCatagory () {
      try {
        await BlogService.createCatagory({ catagoryName: this.catagoryName })
        this.$emit('updateBlog')
        this.$refs.form.reset()
        this.adding = false
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
      }
    },
    async deleteItem (id) {
      try {
        await BlogService.deleteCatagory(id)
        this.$emit('updateBlog')
        this.selectClick(null)
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
.active-list {
  background: var(--v-primary-base);
  color: white;
}
</style>

