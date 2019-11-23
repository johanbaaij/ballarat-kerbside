import axios from '~/plugins/axios'

export const state = () => ({
  monthlyTotals: {}
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  loadMonthlyTotals(state, payload) {
    state.monthlyTotals = payload
  }
}

export const actions = {
  async getMonthlyTotals({ commit }) {
    const response = await axios.get(
      `datastore_search_sql?sql=SELECT
        SUM ("Count"::int) as "Count",
        TO_CHAR("Date"::date, 'YYYY-Mon') AS "Month",
        "Waste Type"
      FROM
        "${process.env.tableIdBins}"
      GROUP BY
        3, 2`
    )
    commit('loadMonthlyTotals', response.data.result.records)
  }
}
