import { useLogin } from '@/hooks/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function LoginForm() {
  const navigate = useNavigate()
  const login = useLogin()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      await login.mutateAsync({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      })
      toast.success('Logged in successfully')
      navigate('/')
    } catch (error) {
      toast.error('Failed to login. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  )
} 