import { uniq, get } from 'lodash'
import axios from '~/plugins/axios'

export const state = () => ({
  wasteTypes: ['landfill', 'green', 'recycling'],
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
    return getters.labels.map((label) => {
      return get(state.monthlyCollections[type], label, null)
    })
  },
  weightsByType: (state, getters) => (type) => {
    return getters.labels.map((label) => {
      return get(state.monthlyWeights[type], label, null)
    })
  },
  labels: (state, getters) => {
    const keys = [
      ...Object.keys(state.monthlyWeights.green),
      ...Object.keys(state.monthlyCollections.green),
      ...Object.keys(state.monthlyWeights.landfill),
      ...Object.keys(state.monthlyCollections.landfill),
      ...Object.keys(state.monthlyWeights.recycling),
      ...Object.keys(state.monthlyCollections.recycling)
    ]
    return uniq(keys).sort()
  }
}
export const actions = {
  async getMonthlyCollections({ commit }) {
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
  async getMonthlyWeight({ commit }, { type, table }) {
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
  async getMonthlyWeights({ dispatch }) {
    await dispatch('getMonthlyWeight', {
      type: 'green',
      table: process.env.tableIdGreen
    })
    await dispatch('getMonthlyWeight', {
      type: 'landfill',
      table: process.env.tableIdLandfill
    })
    await dispatch('getMonthlyWeight', {
      type: 'recycling',
      table: process.env.tableIdRecycling
    })
  },
  calculateMonthLabels({ state, commit }) {
    commit(
      'monthLabels',
      uniq([
        ...Object.keys(state.monthlyWeights.green),
        ...Object.keys(state.monthlyWeights.recycling),
        ...Object.keys(state.monthlyWeights.landfill)
      ]).sort()
    )
  }
}
