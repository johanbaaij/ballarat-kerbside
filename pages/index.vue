<template>
  <v-row>
    <v-col>
      <v-btn @click="refresh">Refresh</v-btn>
      <pre>{{ monthlyTotals }}</pre>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['monthlyTotals'])
  },
  fetch({ store }) {
    store.dispatch('getMonthlyTotals')
  },
  methods: {
    refresh() {
      this.$store.dispatch('getMonthlyTotals')
    }
  }
}
</script>
