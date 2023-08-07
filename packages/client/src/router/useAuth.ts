import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'
import { getUserInfo, oauthServicePost } from '@/store/slices/userSlice/thunks'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const useAuth = () => {
  const user = useAppSelector(selectUserInfo)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()

  const code = new URLSearchParams(search)?.get('code')

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

  const postOauth = async (code: string) => {
    try {
      const response = await dispatch(oauthServicePost({ code }))

      console.log('TESR', response)

      if (
        response.payload === 'OK' ||
        response.payload === 'User already in system'
      ) {
        await dispatch(getUserInfo()).unwrap()
      }
    } catch (error) {
      console.log('OAUTH FAILED', error)
    } finally {
      navigate('/')
    }
  }

  useEffect(() => {
    if (code) {
      postOauth(code)
    }
  }, [code])

  useEffect(() => {
    if (!user) {
      getUserAndRedirect()
    }
  }, [user])

  return user
}

export default useAuth
