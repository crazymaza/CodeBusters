import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'
import { getUserInfo } from '@/store/slices/userSlice/thunks'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const useAuth = () => {
  const user = useAppSelector(selectUserInfo)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isProtectedRoute =
    pathname !== '/sign-in' && pathname !== '/sign-up' && pathname !== '/'

  const getUserAndRedirect = async () => {
    try {
      await dispatch(getUserInfo()).unwrap()
      const currentPathname = !isProtectedRoute ? '/' : pathname
      navigate(currentPathname)
    } catch (error) {
      const currentPathname = isProtectedRoute ? '/' : pathname
      navigate(currentPathname)
    }
  }

  useEffect(() => {
    if (!user) {
      getUserAndRedirect()
    }
  }, [user])

  return user
}

export default useAuth
