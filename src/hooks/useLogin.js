import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '@/services/authService'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/constants/routes'
import { getErrorMessage } from '@/utils/getErrorMessage'

export function useLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.access_token)
      navigate(ROUTES.home, { replace: true })
    },
    onError: (error) => {
      const message =
        error.response?.status === 401
          ? 'Email or password is incorrect.'
          : getErrorMessage(error)
      toast.error(message)
    },
  })
}
