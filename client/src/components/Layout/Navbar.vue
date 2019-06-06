<template>
  <v-navigation-drawer permanent fixed class="primary hidden-md-and-down">
    <div class="title">
      <div class="logo"></div>
      <h1 class="textGrey--text text-xs-center mb-4">Jason Wu</h1>
      <p class="detail textGrey--text text-xs-center">Ph.D of University of Canterbury</p>
    </div>
    <v-list class="nav">
      <template v-for="(item, index) in navItems">
        <v-list-tile
          :key="item.title"
          class="nav-item textGrey--text"
          active-class="white--text bgGrey"
          :to="item.to"
          @click="()=> {}"
        >
          <v-list-tile-action>
            <v-list-tile-title class="nav-item-content secondary--text font-weight-bold">|</v-list-tile-title>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="nav-item-content font-weight-bold">{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action class="nav-item-content secondary--text font-weight-bold">
            <i class="fas fa-chevron-right"></i>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider :key="index" class="textGrey"></v-divider>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>

export default {
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
      ]
    }
  }
}
</script>
<style scoped>
.logo {
  background: url(../../assets/Logo.jpg) no-repeat center;
  background-size: cover;
  border: 2px solid white;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: auto;
  margin-top: 5vh;
  margin-bottom: 5vh;
}
.detail {
  font-size: 1.2rem;
  font-style: italic;
}
.nav {
  margin-top: 10vh;
}
.nav-item-content {
  font-size: 1.4rem;
}
</style>
