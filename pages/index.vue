<template>
  <div v-if="loaded">
    <v-row class="chart-row">
      <v-col>
        <h2>Delivery Weights</h2>
        <chart :chart-data="weightsData" />
      </v-col>
    </v-row>
    <v-row class="chart-row">
      <v-col>
        <h2>Collection Counts</h2>
        <chart :chart-data="collectionsData" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chart from '@/components/chart'

export default {
  components: { Chart },
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['collectionsByType', 'weightsByType', 'labels']),
    collectionsData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Landfill',
            backgroundColor: '#df4444',
            data: this.collectionsByType('landfill')
          },
          {
            label: 'Recycling',
            backgroundColor: '#FFC428',
            data: this.collectionsByType('recycling')
          },
          {
            label: 'Green waste',
            backgroundColor: '#447C2B',

            data: this.collectionsByType('green')
          }
        ]
      }
    },
    weightsData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Landfill',
            backgroundColor: '#df4444',
            data: this.weightsByType('landfill')
          },
          {
            label: 'Recycling',
            backgroundColor: '#FFC428',
            data: this.weightsByType('recycling')
          },
          {
            label: 'Green waste',
            backgroundColor: '#447C2B',

            data: this.weightsByType('green')
          }
        ]
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('getMonthlyWeights')
    await this.$store.dispatch('getMonthlyCollections')

    this.loaded = true
  }
}
</script>
<style>
.chart-row {
  height: 450px;
}
</style>
