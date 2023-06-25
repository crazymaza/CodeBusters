import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'
import Cup from '../../assets/icons/cup.png'
import Forum from '../../assets/icons/forum_light_theme.png'
import Gear from '../../assets/icons/gear.png'
import Wheel from '../../assets/icons/wheel.png'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const mainPageMenu: { label: string; to: string; picture: string }[] = [
  { label: 'Начать игру', to: 'play', picture: Wheel },
  { label: 'Турнирная таблица', to: 'leader-board', picture: Cup },
  { label: 'Форум игроков', to: 'forum', picture: Forum },
  { label: 'Настройки аккаунта', to: 'profile', picture: Gear },
]

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className={cx('main__page')}>
        <Paper variant="outlined" className={cx('main__page_box')} square>
          <div className={cx('box__about')}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta cum
            id omnis voluptates laudantium ipsum inventore earum, minus harum,
            doloremque, voluptate eius natus aperiam reiciendis iste ab veniam.
            Vitae, deserunt? Modi tenetur cumque tempora commodi tempore
            reprehenderit consectetur sequi praesentium natus ad neque officiis
            dolorem sed, perferendis, laudantium placeat veniam, maxime
            excepturi aspernatur facere optio quas ea! Eius, dolor unde? Maiores
            similique ea magnam quod facilis! Odio qui adipisci reprehenderit!
            Corporis debitis nisi nulla facere adipisci repudiandae in
            molestiae, tempora rerum iusto fugit quae, vitae expedita cupiditate
            ipsam blanditiis doloribus? Dolor incidunt beatae saepe tenetur,
            mollitia amet, fuga provident, cumque iusto enim cupiditate! Hic
            illo odio quis minima distinctio ipsa, ratione tempora molestias
            ducimus quia amet, fugit architecto nesciunt voluptate! Nisi ab, ut
            laborum aliquid voluptatum doloremque commodi iure, rem ducimus
            sapiente sequi consequatur consequuntur magni, vel a placeat omnis
            corrupti recusandae excepturi. Qui veritatis, distinctio nesciunt
            rem molestiae iste!
          </div>
          <hr />
          <div className={cx('box__menu')}>
            <List>
              {mainPageMenu.map(({ label, to, picture }) => (
                <ListItem key={to} className={cx('menu__item')}>
                  <Link to={to} className={cx('menu__item_link')}>
                    <ListItemButton className={cx('link__button')}>
                      <ListItemText
                        primary={label}
                        className={cx('link__button_label')}
                      />
                      <ListItemIcon className={cx('link__button_icon')}>
                        <img src={picture} alt="иконка пункта меню" />
                      </ListItemIcon>
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          </div>
        </Paper>
      </div>
    </MainLayout>
  )
}

export default HomePage
