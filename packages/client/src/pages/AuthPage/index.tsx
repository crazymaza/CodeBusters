import { useLocation } from 'react-router-dom'
import { AuthLayout } from '@/layouts'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

const AuthPage = () => {
  const { pathname } = useLocation()

  return (
    <AuthLayout>{pathname === '/sign-in' ? <SignIn /> : <SignUp />}</AuthLayout>
  )
}

export default AuthPage
