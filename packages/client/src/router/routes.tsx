import * as Pages from '@/pages'
import { RouteObject } from 'react-router-dom'

import { ErrorBoundary } from '@/components'
import { AppDispatch } from '@/store'
import { getUserInfo } from '@/store/slices/userSlice/thunks'

type Props = {
  children: React.ReactNode
  keyValue: string
}

const ErrorElement: React.FC<Props> = ({ children, keyValue }) => {
  return (
    <ErrorBoundary
      key={keyValue}
      children={children}
      errorComponent={
        <Pages.ErrorPage
          topMessage={'Извините, у нас ремонт'}
          bottomMessage={'Но совсем скоро мы его закончим'}
        />
      }
    />
  )
}

// TODO: добавить для лидерборда
const getUserLoader = (dispatch: AppDispatch) => {
  return dispatch(getUserInfo())
}

export const childrenRoutes = [
  {
    path: '/',
    index: true,
    element: <ErrorElement keyValue="home" children={<Pages.HomePage />} />,
    loader: getUserLoader,
  },
  {
    path: 'sign-in',
    element: <ErrorElement keyValue="sign-in" children={<Pages.AuthPage />} />,
    loader: getUserLoader,
  },
  {
    path: 'sign-up',
    element: <ErrorElement keyValue="sign-up" children={<Pages.AuthPage />} />,
    loader: getUserLoader,
  },
  {
    path: 'play',
    element: <ErrorElement keyValue="play" children={<Pages.PlayPage />} />,
    loader: getUserLoader,
  },
  {
    path: 'leader-board',
    element: <Pages.LeaderBoardPage />,
    // loader: getUserLoader, тут другой лоадер
  },
  {
    path: 'forum',
    element: <ErrorElement keyValue="forum" children={<Pages.ForumPage />} />,
    loader: getUserLoader,
  },
  {
    path: 'forum/:topicId',
    element: (
      <ErrorElement
        keyValue="forum-topic"
        children={<Pages.ForumTopicPage />}
      />
    ),
    loader: getUserLoader,
  },
  {
    path: 'profile',
    element: (
      <ErrorElement keyValue="profile" children={<Pages.ProfilePage />} />
    ),
    loader: getUserLoader,
  },
  {
    path: 'end-game',
    element: (
      <ErrorElement keyValue="end-game" children={<Pages.EndGamePage />} />
    ),
    loader: getUserLoader,
  },
  {
    path: '500',
    element: (
      <Pages.ErrorPage
        topMessage={'Извините, у нас ремонт'}
        bottomMessage={'Но совсем скоро мы его закончим'}
      />
    ),
  },
  {
    path: '*',
    element: (
      <Pages.ErrorPage
        topMessage={'Упс..'}
        bottomMessage={'Такой страницы не существует'}
      />
    ),
  },
]

export const routesWithoutLoaders = childrenRoutes.map(
  ({ loader, ...rest }) => ({
    ...rest,
  })
)

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Pages.RootContainer />,
    children: routesWithoutLoaders,
  },
]
