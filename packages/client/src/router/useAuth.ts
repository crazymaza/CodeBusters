import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'
import { getUserInfo, oauthServicePost } from '@/store/slices/userSlice/thunks'
import { getTheme } from '@/store/slices/themeSlice/thunks'
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

  const checkUserAndRedirect = async () => {
    if (user) {
      const currentPathname = !isProtectedRoute ? '/' : pathname

      navigate(currentPathname)
    } else {
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

        await dispatch(getUserInfo())
        await dispatch(getTheme())
      } else {
        navigate('/')
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
    checkUserAndRedirect()
  }, [user])

  return user
}

export default useAuth
