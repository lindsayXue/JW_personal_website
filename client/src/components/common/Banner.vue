<template>
  <v-layout id="banner" align-center>
    <v-flex class="content white--text">
      <h1 class="font-weight-regular mb-4">{{title.toUpperCase()}}</h1>
      <p class="detail">
        {{desc}}
        <v-dialog v-model="dialog" width="600">
          <template v-slot:activator="{ on }">
            <v-btn flat dark small v-on="on">
              <i class="fas fa-edit"></i>
            </v-btn>
          </template>
          <DescHandler v-on:closeDialog="closeDialog" :title="title" v-on:updateDesc="updateDesc"/>
        </v-dialog>
      </p>
    </v-flex>
  </v-layout>
</template>
<script>
import DescHandler from '../admin/DescHandler'
import LayoutService from '../../services/Layout'

export default {
  components: {
    DescHandler
  },
  props: {
    title: String
  },
  data () {
    return {
      dialog: false,
      desc: ''
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    },
    updateDesc (updateData) {
      this.desc = updateData
    }
  },
  async mounted () {
    try {
      const res = await LayoutService.getLayout()
      this.desc = res.data[`${this.title}Desc`]
    } catch (err) {
      if (err.response.data.errors) {
        this.$store.dispatch('setErrors', err.response.data.errors)
      }
    }
  }
}
</script>
<style scoped>
#banner {
  height: 280px;
  background-color: var(--v-tertiary-base);
}
.content {
  padding-left: 5vw;
}
</style>

