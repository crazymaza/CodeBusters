import { Outlet, Link } from 'react-router-dom'
import { Button } from '@/components'
import { useTheme } from '@/themes'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

// TODO конфиг временный, подлежит удалению, так как только служит для демонстрации подключенных роутов
import tempRoutes from './routes.temp.config'

const cx = classNames.bind(styles)

const RootContainer = () => {
  const [switchTheme] = useTheme()

  return (
    <section className={cx('root-section')}>
      <Button variant="contained" onClick={switchTheme}>
        Переключить Тему
      </Button>
      <ul>
        {tempRoutes.map((route, index) => (
          <li key={index}>
            <Link to={route.path}>{route.title}</Link>
          </li>
        ))}
      </ul>
      <p>Вот тут будет жить ваше приложение :)</p>
      <div className={cx('root-section__outlet')}>
        <Outlet />
      </div>
    </section>
  )
}

export default RootContainer
