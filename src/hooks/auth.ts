import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useAuthStore } from '@/stores/auth'
import { useNavigate } from 'react-router-dom'

interface User {
  id: number
  email: string
  name: string
  lastname: string
  createdOn: string
  modifiedOn: string
  lastLoginDate: string
  image?: string
}

interface ApiResponse<T> {
  data: T
  errorCode: number
  errorMessage: string
  hasError: boolean
}

export function useUser() {
  const { setUser } = useAuthStore()

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<User>>('/me')
      if (data.hasError) {
        setUser(null)
        return null
      }
      setUser(data.data)
      return data.data
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false
  })
}

export function useLogin() {
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post<ApiResponse<User>>('/login', credentials)
      return data.data
    },
    onSuccess: (data) => {
      setUser(data)
    },
  })
}

export function useLogout() {
  const { setUser } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      await api.get<ApiResponse<void>>('/logout')
    },
    onSuccess: () => {
      setUser(null)
      navigate('/login')
    },
  })
} 