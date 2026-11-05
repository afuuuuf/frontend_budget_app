import axios from 'axios'
import { tokenStorage } from '@/libs/tokenStorage'
import { API_PATHS, AUTH_LOGOUT_EVENT } from '@/constants/api'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const AUTH_URLS = Object.values(API_PATHS)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const url = error.config?.url ?? ''
    // A 401 on login itself just means bad credentials; anywhere else it means the session ended.
    if (status === 401 && !AUTH_URLS.includes(url)) {
      tokenStorage.clear()
      window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT))
    }
    return Promise.reject(error)
  },
)
