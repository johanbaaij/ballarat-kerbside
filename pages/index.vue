<template>
  <div>
    <v-row class="chart-row">
      <v-col>
        <h2>Delivery Weights</h2>
        <chart :chart-data="weightsData" :options="chartOptions" />
      </v-col>
    </v-row>
    <v-row class="chart-row">
      <v-col>
        <h2>Collection Counts</h2>
        <chart :chart-data="collectionsData" :options="chartOptions" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Chart from '@/components/chart'

export default {
  components: { Chart },
  head: {
    title: 'Home'
  },
  data() {
    return {
      chartOptions: {
        maintainAspectRatio: false,
        responsiveAnimationDuration: 100,
        scales: {
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    }
  },
  computed: {
    ...mapState(['wasteTypes']),
    ...mapGetters(['collectionsByType', 'weightsByType', 'labels']),
    collectionDatasets() {
      const vm = this
      return [
        {
          wasteType: 'landfill',
          label: 'Landfill',
          backgroundColor: '#df4444',
          data: this.collectionsByType('landfill')
        },
        {
          wasteType: 'recycling',
          label: 'Recycling',
          backgroundColor: '#FFC428',
          data: this.collectionsByType('recycling')
        },
        {
          wasteType: 'green',
          label: 'Green waste',
          backgroundColor: '#447C2B',
          data: this.collectionsByType('green')
        }
      ].filter((set) => {
        return vm.wasteTypes.includes(set.wasteType)
      })
    },
    collectionsData() {
      return {
        labels: this.labels,
        datasets: this.collectionDatasets
      }
    },
    weightDatasets() {
      const vm = this
      return [
        {
          wasteType: 'landfill',
          label: 'Landfill',
          backgroundColor: '#df4444',
          data: this.weightsByType('landfill')
        },
        {
          wasteType: 'recycling',
          label: 'Recycling',
          backgroundColor: '#FFC428',
          data: this.weightsByType('recycling')
        },
        {
          wasteType: 'green',
          label: 'Green waste',
          backgroundColor: '#447C2B',
          data: this.weightsByType('green')
        }
      ].filter((set) => {
        return vm.wasteTypes.includes(set.wasteType)
      })
    },
    weightsData() {
      return {
        labels: this.labels,
        datasets: this.weightDatasets
      }
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('fetchMonthlyWeights')
    await store.dispatch('fetchMonthlyCollections')
  }
}
</script>
<style>
.chart-row {
  height: 30vh;
  min-height: 450px;
  position: relative;
}
</style>
