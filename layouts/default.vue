<template>
  <v-app>
    <v-app-bar color="primary" dark app>
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
export default {
  data() {
    return {
      title: 'Ballarat Kerbside Data',
      drawer: true
    }
  }
}
</script>
