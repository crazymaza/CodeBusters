import { Outlet, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { selectUserInfo } from '@/store/slices/authSlice/selectors'
import { useEffect } from 'react'
import { getUserInfo } from '@/store/slices/authSlice/thunks'

const ProtectedRoute = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUserInfo)

  return user ? <Outlet /> : <Navigate to="/sign-in" />
}

export default ProtectedRoute
