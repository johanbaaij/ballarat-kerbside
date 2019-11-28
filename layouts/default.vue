<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <filters />
    </v-navigation-drawer>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span
        >A website by <a href="https://johan.baaij.com.au">Johan Baaij</a></span
      >
      <v-spacer />
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
      drawer: true
    }
  }
}
</script>
