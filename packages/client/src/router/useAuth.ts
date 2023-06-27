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

  useEffect(() => {
    if (!user) {
      dispatch(getUserInfo())
        .unwrap()
        .then(() => {
          if (!isProtectedRoute) {
            navigate('/')
          } else {
            navigate(pathname)
          }
        })
        .catch(() => {
          navigate('/sign-in')
        })
    }
  }, [user])

  return user
}

export default useAuth
