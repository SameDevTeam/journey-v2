import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useAuthStore } from '@/stores/auth'

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me')
      return data
    },
    retry: false,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  const { login } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      await login(credentials.email, credentials.password)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const { logout } = useAuthStore()

  return useMutation({
    mutationFn: async () => {
      await logout()
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })
} 