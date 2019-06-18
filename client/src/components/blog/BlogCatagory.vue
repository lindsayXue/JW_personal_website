<template>
  <div class="blog-catagory">
    <div class="lgAndMd hidden-sm-and-down" :class="{'md': $vuetify.breakpoint.md}">
      <h1 class="tertiary--text font-weight-regular ma-2">
        Catagory
        <v-btn dark flat small @click="addClick" v-if="!adding && $store.state.isAdmin">
          <i class="fas fa-plus"></i>
        </v-btn>
        <v-btn dark flat small @click="closeClick" v-if="adding && $store.state.isAdmin">
          <i class="fas fa-times"></i>
        </v-btn>
      </h1>
      <v-progress-linear v-if="isLoading" :indeterminate="true" color="secondary" height="3"></v-progress-linear>
      <CatagoryList v-on:updateBlog="updateBlog" :catagoryData="catagoryData"/>
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
    <div class="smAndXs hidden-md-and-up white">
      <v-menu offset-y dark>
        <template v-slot:activator="{ on }">
          <v-btn dark color="tertiary" outline v-on="on">Catagory</v-btn>
        </template>
        <CatagoryList v-on:updateBlog="updateBlog" :catagoryData="catagoryData"/>
      </v-menu>
    </div>
  </div>
</template>
<script>
import CatagoryHandler from '../admin/CatagoryHandler'
import BlogService from '../../services/Blog'
import CatagoryList from './CatagoryList'

export default {
  props: ['catagoryData'],
  components: {
    CatagoryHandler,
    CatagoryList
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
    updateBlog () {
      this.$emit('updateBlog')
    },
    async addCatagory () {
      try {
        await BlogService.createCatagory({ catagoryName: this.catagoryName })
        this.updateBlog()
        this.$refs.form.reset()
        this.adding = false
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
.blog-catagory .lgAndMd {
  height: calc(100vh - 280px);
}
.blog-catagory .lgAndMd.md {
  height: calc(100vh - 360px);
}
.active-list {
  background: var(--v-lightGrey-base);
  color: var(--v-tertiary-base);
}
.catagory-nav {
  padding-top: 80px;
}
</style>

