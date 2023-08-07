import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import {
  selectUserInfo,
  selectUserIsOauth,
} from '@/store/slices/userSlice/selectors'
import { getUserInfo, oauthServicePost } from '@/store/slices/userSlice/thunks'
import { UserAuthOptions } from '@/api/User/types'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const useAuth = () => {
  const user = useAppSelector(selectUserInfo)
  const isOauth = useAppSelector(selectUserIsOauth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()

  const code = new URLSearchParams(search)?.get('code')

  const isProtectedRoute =
    pathname !== '/sign-in' && pathname !== '/sign-up' && pathname !== '/'

  const getUserAndRedirect = async (options: UserAuthOptions = {}) => {
    try {
      await dispatch(getUserInfo(options)).unwrap()

      const currentPathname = !isProtectedRoute ? '/' : pathname

      navigate(currentPathname)
    } catch (error) {
      const currentPathname = isProtectedRoute ? '/' : pathname

      navigate(currentPathname)
    }
  }

  const postOauth = async (code: string) => {
    try {
      const response = await dispatch(oauthServicePost({ code }))

      if (
        response.payload === 'OK' ||
        response.payload === 'User already in system'
      ) {
        console.log('OAuth success: ', response.payload)

        setTimeout(async () => {
          getUserAndRedirect({ isOauth: true })
        })
      }
    } catch (error) {
      console.log('OAuth error', error)
    }
  }

  useEffect(() => {
    if (code) {
      postOauth(code)
    }
  }, [code])

  useEffect(() => {
    if (!user) {
      getUserAndRedirect({ isOauth })
    }
  }, [user, isOauth])

  return user
}

export default useAuth
