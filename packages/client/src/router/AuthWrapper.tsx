import useAuth from './useAuth'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '@/store/typedHooks'
import { selectAuthLoading } from '@/store/slices/userSlice/selectors'
import { Backdrop, CircularProgress } from '@mui/material'

const AuthWrapper = () => {
  const loading = useAppSelector(selectAuthLoading)
  useAuth()

  return (
    <>
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress color="primary" />
        </Backdrop>
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default AuthWrapper
