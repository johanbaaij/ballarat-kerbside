<template>
  <v-row>
    <v-col>
      <chart :chart-data="chartData" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Chart from '@/components/chart'

export default {
  components: { Chart },

  computed: {
    ...mapGetters(['collectionsByType', 'monthLabels']),
    chartData() {
      return {
        labels: this.monthLabels,
        datasets: [
          {
            label: 'Landfill',
            backgroundColor: '#df4444',
            data: this.collectionsByType('Landfill')
          },
          {
            label: 'Recycling',
            backgroundColor: '#FFC428',
            data: this.collectionsByType('Recycling')
          },
          {
            label: 'Green waste',
            backgroundColor: '#447C2B',

            data: this.collectionsByType('Green Waste')
          }
        ]
      }
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.$store.dispatch('getMonthlyCollections')
    }
  }
}
</script>
