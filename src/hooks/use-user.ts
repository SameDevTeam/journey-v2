import { useLogout, useUser as useUserQuery } from './auth'
import { useAuthStore } from '../stores/auth'

export const useUser = () => {
  const { mutate: logoutMutation } = useLogout()
  const { data: userData } = useUserQuery()
  const { user } = useAuthStore()
  
  return { 
    user: userData || user,
    logout: () => logoutMutation()
  }
} 