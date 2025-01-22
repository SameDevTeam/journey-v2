import { create } from 'zustand'
import axios from 'axios'

interface User {
  id: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const { data } = await axios.get('/api/auth/me', { withCredentials: true })
      set({ user: data, isAuthenticated: true })
    } catch {
      set({ user: null, isAuthenticated: false })
    }
  },

  login: async (email: string, password: string) => {
    const { data } = await axios.post(
      '/api/auth/login', 
      { email, password },
      { withCredentials: true }
    )
    set({ user: data, isAuthenticated: true })
  },

  logout: async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true })
    set({ user: null, isAuthenticated: false })
  },
})) 