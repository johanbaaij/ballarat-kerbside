<template>
  <v-app>
    <v-content>
      <v-container>
        <h1>{{ title }}</h1>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Ballarat Kerbside Data'
    }
  }
}
</script>
