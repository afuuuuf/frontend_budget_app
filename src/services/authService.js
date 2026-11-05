import { apiClient } from '@/libs/apiClient'
import { API_PATHS } from '@/constants/api'

export const authService = {
  // Assumes JSON body { email, password } and a response like { access_token, token_type }.
  async login({ email, password }) {
    const { data } = await apiClient.post(API_PATHS.login, { email, password })
    return data
  },

  async register({ email, password }) {
    const { data } = await apiClient.post(API_PATHS.register, { email, password })
    return data
  },
}
