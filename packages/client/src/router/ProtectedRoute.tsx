import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { selectUserInfo } from '@/store/slices/authSlice/selectors'
import { getUserInfo } from '@/store/slices/authSlice/thunks'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ProtectedRoute = () => {
  const user = useAppSelector(selectUserInfo)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      dispatch(getUserInfo())
        .unwrap()
        .catch(() => {
          navigate('/sign-in')
        })
    }
  }, [user])

  return <>{user && <Outlet />}</>
}

export default ProtectedRoute
