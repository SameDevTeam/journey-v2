import axios from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't show toast for 401 errors
    if (error.response?.status !== 401) {
      const message = error.response?.data?.message || 'Something went wrong'
      toast.error(message)
    }
    return Promise.reject(error)
  }
) 