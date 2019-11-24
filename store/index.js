import { uniq } from 'lodash'
import axios from '~/plugins/axios'

export const state = () => ({
  monthlyCollections: []
})

export const mutations = {
  monthlyCollections(state, payload) {
    state.monthlyCollections = payload
  }
}

export const getters = {
  collectionsByType: (state) => (type) => {
    return state.monthlyCollections
      .filter((record) => record['Waste Type'] === type)
      .map((record) => record.Count)
  },
  monthLabels: (state) => {
    return uniq(state.monthlyCollections.map((record) => record.Month))
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
        "${process.env.tableIdBins}"
      GROUP BY
        3, 2
      ORDER BY
        "Month"`
    )
    commit('monthlyCollections', response.data.result.records)
  }
}
