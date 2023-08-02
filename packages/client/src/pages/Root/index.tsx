import { Outlet } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

import useAuth from '@/router/useAuth'
import { useAppSelector } from '@/store/typedHooks'
import { selectAuthLoading } from '@/store/slices/userSlice/selectors'
import { Backdrop, CircularProgress } from '@mui/material'

const cx = classNames.bind(styles)

const RootContainer = () => {
  const loading = useAppSelector(selectAuthLoading)
  useAuth()

  return (
    <>
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress color="primary" />
        </Backdrop>
      ) : (
        <section className={cx('root-section')}>
          <div className={cx('root-section__outlet')}>
            <Outlet />
          </div>
        </section>
      )}
    </>
  )
}

export default RootContainer
