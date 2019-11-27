<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <filters />
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Filters from '@/components/Filters'
export default {
  components: {
    Filters
  },
  data() {
    return {
      title: 'Ballarat Kerbside Data',
      drawer: false
    }
  }
}
</script>
