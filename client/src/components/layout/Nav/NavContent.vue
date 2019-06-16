<template>
  <div>
    <div class="title hidden-sm-and-down">
      <div class="profile" v-if="$store.state.profile">
        <div class="logo"></div>
        <h1
          class="textGrey--text text-xs-center mb-4"
        >{{$store.state.profile.firstName}} {{$store.state.profile.lastName}}</h1>
        <p class="detail textGrey--text text-xs-center">{{$store.state.profile.currentTitle}}</p>
      </div>
      <v-dialog v-model="dialog" width="600" v-if="$store.state.isAdmin" persistent>
        <template v-slot:activator="{ on }">
          <v-btn flat dark v-on="on" absolute right>
            <i class="fas fa-plus pr-2" v-if="!$store.state.profile"></i>
            <i class="fas fa-edit pr-2" v-if="!!$store.state.profile"></i> profile
          </v-btn>
        </template>
        <ProfileHandler v-on:closeDialog="closeDialog"/>
      </v-dialog>
    </div>
    <v-list class="nav-items hidden-sm-and-down">
      <template v-for="(item, index) in navItems">
        <v-divider :key="index" class="textGrey"></v-divider>
        <v-list-tile
          :key="item.title"
          class="nav-item textGrey--text"
          active-class="white--text bgGrey"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-list-tile-title class="nav-item-icon secondary--text font-weight-bold">|</v-list-tile-title>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="nav-item-content font-weight-bold">{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action class="nav-item-icon secondary--text font-weight-bold">
            <i class="fas fa-chevron-right"></i>
          </v-list-tile-action>
        </v-list-tile>
      </template>
      <v-divider class="textGrey"></v-divider>
      <v-list-tile class="nav-item textGrey--text" @click="logout" v-if="$store.state.isAdmin">
        <v-list-tile-action>
          <v-list-tile-title class="nav-item-icon secondary--text font-weight-bold">|</v-list-tile-title>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="nav-item-content font-weight-bold">LOGOUT</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action class="nav-item-icon secondary--text font-weight-bold">
          <i class="fas fa-chevron-right"></i>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-list class="nav-items hidden-md-and-up">
      <template v-for="(item, index) in navItems">
        <v-divider :key="index" class="textGrey"></v-divider>
        <v-list-tile
          :key="item.title"
          class="nav-item textGrey--text"
          active-class="white--text bgGrey"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-list-tile-title class="nav-item-icon secondary--text font-weight-bold">|</v-list-tile-title>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="nav-item-content font-weight-bold">{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action class="nav-item-icon secondary--text font-weight-bold">
            <i class="fas fa-chevron-right"></i>
          </v-list-tile-action>
        </v-list-tile>
      </template>
      <v-divider class="textGrey"></v-divider>
      <v-list-tile class="nav-item textGrey--text" @click="logout" v-if="$store.state.isAdmin">
        <v-list-tile-action>
          <v-list-tile-title class="nav-item-icon secondary--text font-weight-bold">|</v-list-tile-title>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="nav-item-content font-weight-bold">LOGOUT</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action class="nav-item-icon secondary--text font-weight-bold">
          <i class="fas fa-chevron-right"></i>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <Footer class="footer hidden-sm-and-down"/>
  </div>
</template>
<script>
import Footer from '../Footer'
import ProfileHandler from '../../admin/ProfileHandler'

export default {
  components: {
    Footer,
    ProfileHandler
  },
  data () {
    return {
      navItems: [
        {
          title: 'HOME',
          to: '/'
        },
        {
          title: 'RESEARCH',
          to: '/research'
        },
        {
          title: 'PUBLICATIONS',
          to: '/publications'
        },
        {
          title: 'BLOG',
          to: '/blog'
        },
        {
          title: 'CONTACT',
          to: '/contact'
        }
      ],
      dialog: false
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    },
    logout () {
      this.$store.dispatch('logoutAdmin')
      this.$router.push('/admin/login')
    }
  }
}
</script>
<style scoped>
.logo {
  background: url(../../../assets/Logo.jpg) no-repeat center;
  background-size: cover;
  border: 2px solid white;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: auto;
  margin-top: 5vh;
  margin-bottom: 5vh;
}
.title {
  margin-bottom: 10vh;
}
.nav-items {
  padding: 0;
}
.nav-item-content {
  font-size: 1.2rem;
}
.nav-item-icon {
  font-size: 1.6rem;
}
</style>
