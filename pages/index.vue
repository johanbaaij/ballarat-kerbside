<template>
  <div>
    <v-row>
      <v-col>
        <p>
          The City of Ballarat is one of the few Australian cities that
          publishes detailed data on their kerbside bin collections. This site
          aims to make this data easier to explore.
        </p>
      </v-col>
    </v-row>
    <v-row class="chart-row">
      <v-col>
        <h2>Delivery Weights</h2>
        <chart :chart-data="weightsData" :options="chartOptions" />
      </v-col>
      <v-col>
        <h2>Collection Counts</h2>
        <chart :chart-data="collectionsData" :options="chartOptions" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>
          Datasets:<br />
          <a
            href="https://data.gov.au/data/dataset/ballarat-kerbside-green-waste-deliveries"
            >Ballarat Kerbside Green Waste Deliveries</a
          ><br />
          <a
            href="https://data.gov.au/data/dataset/ballarat-kerbside-landfill-deliveries"
            >Ballarat Kerbside Landfill Deliveries</a
          ><br />
          <a
            href="https://data.gov.au/data/dataset/ballarat-kerbside-recycling-deliveries"
            >Ballarat Kerbside Recycling Deliveries</a
          ><br />
          <a
            href="https://data.gov.au/data/dataset/91fe5bbb-0738-4b39-a56f-7687c6dce65e"
            >Ballarat Kerbside Bin Collections</a
          ><br />
          City of Ballarat, Sourced on 28 November 2019
        </p>
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
    ...mapGetters([
      'collectionsByType',
      'weightsByType',
      'collectionLabels',
      'weightLabels'
    ]),
    collectionDatasets() {
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
      ]
    },
    collectionsData() {
      return {
        labels: this.collectionLabels,
        datasets: this.collectionDatasets
      }
    },
    weightDatasets() {
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
      ]
    },
    weightsData() {
      return {
        labels: this.weightLabels,
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
