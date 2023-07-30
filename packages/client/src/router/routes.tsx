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

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthWrapper />}>
      <Route path="/" element={<Pages.RootContainer />}>
        <Route
          path="sign-in"
          element={
            <ErrorElement keyValue="sign-in" children={<Pages.AuthPage />} />
          }
        />
        <Route
          path="sign-up"
          element={
            <ErrorElement keyValue="sign-up" children={<Pages.AuthPage />} />
          }
        />
        <Route
          index
          element={
            <ErrorElement keyValue="home" children={<Pages.HomePage />} />
          }
        />
        <Route
          path="play"
          element={
            <ErrorElement keyValue="play" children={<Pages.PlayPage />} />
          }
        />
        <Route
          path="leader-board"
          element={
            <ErrorElement
              keyValue="leader-board"
              children={<Pages.LeaderBoardPage />}
            />
          }
        />
        <Route
          path="forum"
          element={
            <ErrorElement keyValue="forum" children={<Pages.ForumPage />} />
          }
        />
        <Route
          path="forum/:topicId"
          element={
            <ErrorElement
              keyValue="forum-topic"
              children={<Pages.ForumTopicPage />}
            />
          }
        />
        <Route
          path="profile"
          element={
            <ErrorElement keyValue="profile" children={<Pages.ProfilePage />} />
          }
        />
        <Route
          path="end-game"
          element={
            <ErrorElement
              keyValue="end-game"
              children={<Pages.EndGamePage />}
            />
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
