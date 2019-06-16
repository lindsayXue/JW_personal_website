<template>
  <v-layout id="banner" align-center>
    <v-flex class="content white--text">
      <h1 class="font-weight-regular mb-4 text-capitalize">{{title}}</h1>
      <p class="detail">
        {{desc}}
        <v-dialog
          v-model="dialog"
          width="600"
          v-if="$store.state.isAdmin && $store.state.profile"
          persistent
        >
          <template v-slot:activator="{ on }">
            <v-btn flat dark small v-on="on">
              <i class="fas fa-edit"></i>
            </v-btn>
          </template>
          <DescHandler v-on:closeDialog="closeDialog" :title="title" :desc="desc"/>
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
    closeDialog (update) {
      this.dialog = false
      if (update) {
        this.updateDesc()
      }
    },
    async updateDesc () {
      try {
        const res = await LayoutService.getLayout()
        if (res.data) {
          this.desc = res.data[`${this.title}Desc`]
          return
        }
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
      }
    }
  },
  mounted () {
    this.updateDesc()
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

