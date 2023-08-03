import * as Pages from '@/pages'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import AuthWrapper from './AuthWrapper'
import { ErrorBoundary } from '@/components'

type Props = {
  children: React.ReactNode
  key: string
}

const ErrorElement: React.FC<Props> = ({ children, key }) => {
  return (
    <ErrorBoundary
      key={key}
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

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthWrapper />}>
      <Route path="/" element={<Pages.RootContainer />}>
        <Route
          path="sign-in"
          element={<ErrorElement key="sign-in" children={<Pages.AuthPage />} />}
        />
        <Route
          path="sign-up"
          element={<ErrorElement key="sign-up" children={<Pages.AuthPage />} />}
        />
        <Route
          index
          element={<ErrorElement key="home" children={<Pages.HomePage />} />}
        />
        <Route
          path="play"
          element={<ErrorElement key="play" children={<Pages.PlayPage />} />}
        />
        <Route
          path="leader-board"
          element={
            <ErrorElement
              key="leader-board"
              children={<Pages.LeaderBoardPage />}
            />
          }
        />
        <Route
          path="forum"
          element={<ErrorElement key="forum" children={<Pages.ForumPage />} />}
        />
        <Route
          path="forum/:topicId"
          element={
            <ErrorElement
              key="forum-topic"
              children={<Pages.ForumTopicPage />}
            />
          }
        />
        <Route
          path="profile"
          element={
            <ErrorElement key="profile" children={<Pages.ProfilePage />} />
          }
        />
        <Route
          path="500"
          element={
            <Pages.ErrorPage
              topMessage={'Извините, у нас ремонт'}
              bottomMessage={'Но совсем скоро мы его закончим'}
            />
          }
        />
        <Route
          path="*"
          element={
            <Pages.ErrorPage
              topMessage={'Упс..'}
              bottomMessage={'Такой страницы не существует'}
            />
          }
        />
      </Route>
    </Route>
  )
)
