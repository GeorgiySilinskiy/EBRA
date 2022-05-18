// import { firebase } from'~/plugins/firebase.js'
import JWTDecode from 'jwt-decode'
import cookieparser from 'cookieparser'
export const state = () => ({
  error: null,
  loading: false
})

export const mutations = {
  setError(state, error) {
    state.error = error
  },
  clearError(state) {
    state.error = null
  },
  setLoading(state, payload) {
    state.loading = payload
  }
}
export const actions = {
  async nuxtServerInit({ dispatch, commit }, { req }) {
    if (process.server && process.static) return
    if (!req.headers.cookie) return
    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCode = parsed.access_token
    if (!accessTokenCode) return
    const decode = JWTDecode(accessTokenCode)
    if (decode) {
      await commit('auth/setToken', accessTokenCode)
      await dispatch('auth/fetchUsers', decode.user_id)
    }
  }
}

export const getters = {
  error: state => state.error,
  loading: state => state.loading
}
