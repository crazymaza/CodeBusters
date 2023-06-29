import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { selectUserInfo } from '@/store/slices/authSlice/selectors'
import { getUserInfo } from '@/store/slices/authSlice/thunks'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const useAuth = () => {
  const user = useAppSelector(selectUserInfo)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isProtectedRoute = pathname !== '/sign-in' && pathname !== '/sign-up'

  const getUserAndRedirect = async () => {
    try {
      await dispatch(getUserInfo()).unwrap()

      if (!isProtectedRoute) {
        navigate('/')
      } else {
        navigate(pathname)
      }
    } catch (error) {
      navigate('/sign-in')
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