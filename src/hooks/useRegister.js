import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '@/services/authService'
import { ROUTES } from '@/constants/routes'
import { getErrorMessage } from '@/utils/getErrorMessage'

export function useRegister() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success('Account created. Log in to continue.')
      navigate(ROUTES.login, { replace: true })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}
