import { uniq, get } from 'lodash'
import axios from '~/plugins/axios'

export const state = () => ({
  wasteTypes: ['landfill', 'green', 'recycling'],
  years: ['all', 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
  monthlyCollections: {
    landfill: {},
    green: {},
    recycling: {}
  },
  monthlyWeights: {
    landfill: {},
    green: {},
    recycling: {}
  }
})

export const mutations = {
  monthlyCollections(state, payload) {
    Object.assign(state.monthlyCollections, payload)
  },
  monthlyWeights(state, payload) {
    Object.assign(state.monthlyWeights, payload)
  },
  monthLabels(state, payload) {
    Object.assign(state.monthLabels, payload)
  },
  wasteTypes(state, payload) {
    Object.assign(state, { wasteTypes: payload })
  }
}

export const getters = {
  collectionsByType: (state, getters) => (type) => {
    return getters.collectionLabels.map((label) => {
      return get(state.monthlyCollections[type], label, null)
    })
  },
  weightsByType: (state, getters) => (type) => {
    return getters.weightLabels.map((label) => {
      return get(state.monthlyWeights[type], label, null)
    })
  },
  weightLabels: (state) => {
    const keys = [
      ...Object.keys(state.monthlyWeights.green),
      ...Object.keys(state.monthlyWeights.landfill),
      ...Object.keys(state.monthlyWeights.recycling)
    ]
    return uniq(keys).sort()
  },
  collectionLabels: (state) => {
    const keys = [
      ...Object.keys(state.monthlyCollections.green),
      ...Object.keys(state.monthlyCollections.landfill),
      ...Object.keys(state.monthlyCollections.recycling)
    ]
    return uniq(keys).sort()
  }
}
export const actions = {
  async fetchMonthlyCollections({ commit }) {
    const response = await axios.get(
      `datastore_search_sql?sql=SELECT
        SUM ("Count"::int) as "Count",
        TO_CHAR("Date"::date, 'YYYYMM') AS "Month",
        "Waste Type"
      FROM
        "${process.env.tableIdCollections}"
      GROUP BY
        2, 3
      ORDER BY
        "Month"`
    )
    commit('monthlyCollections', {
      green: response.data.result.records
        .filter((r) => r['Waste Type'] === 'Green Waste')
        .reduce((obj, item) => {
          obj[item.Month] = item.Count
          return obj
        }, {})
    })
    commit('monthlyCollections', {
      recycling: response.data.result.records
        .filter((r) => r['Waste Type'] === 'Recycling')
        .reduce((obj, item) => {
          obj[item.Month] = item.Count
          return obj
        }, {})
    })
    commit('monthlyCollections', {
      landfill: response.data.result.records
        .filter((r) => r['Waste Type'] === 'Landfill')
        .reduce((obj, item) => {
          obj[item.Month] = item.Count
          return obj
        }, {})
    })
  },
  async fetchMonthlyWeight({ commit }, { type, table }) {
    const response = await axios.get(
      `datastore_search_sql?sql=SELECT
        SUM ("weight"::real) as "weight",
        TO_CHAR("date"::date, 'YYYYMM') AS "Month"
      FROM
        "${table}"
      GROUP BY
        2
      ORDER BY
        "Month"`
    )
    commit('monthlyWeights', {
      [type]: response.data.result.records.reduce((obj, item) => {
        obj[item.Month] = item.weight
        return obj
      }, {})
    })
  },
  async fetchMonthlyWeights({ dispatch }) {
    await dispatch('fetchMonthlyWeight', {
      type: 'green',
      table: process.env.tableIdGreen
    })
    await dispatch('fetchMonthlyWeight', {
      type: 'landfill',
      table: process.env.tableIdLandfill
    })
    await dispatch('fetchMonthlyWeight', {
      type: 'recycling',
      table: process.env.tableIdRecycling
    })
  }
}
