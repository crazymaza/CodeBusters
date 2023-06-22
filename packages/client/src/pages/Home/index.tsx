import { MainLayout } from '@/layouts'
import { Button } from '@/components'
import { useTheme } from '@/themes'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const HomePage = () => {
  const [switchTheme] = useTheme()

  return (
    <MainLayout title="Codebusters">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>
          Вот тут будет жить ваше приложение :)
        </p>
        <h4>Example Button</h4>
        <Button variant="contained" onClick={switchTheme}>
          Переключить Тему
        </Button>
      </div>
    </MainLayout>
  )
}

export default HomePage
