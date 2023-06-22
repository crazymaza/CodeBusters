import * as Pages from '@/pages'
import { createBrowserRouter } from 'react-router-dom'

export default createBrowserRouter([
  {
    path: '/',
    element: <Pages.RootContainer />,
    errorElement: <Pages.ErrorPage />,
    children: [
      {
        index: true,
        element: <Pages.HomePage />,
      },
      {
        path: 'sign-in',
        element: <Pages.SignInPage />,
      },
      {
        path: 'sign-up',
        element: <Pages.SignUpPage />,
      },
      {
        path: 'play',
        element: <Pages.PlayPage />,
      },
      {
        path: 'leader-board',
        element: <Pages.LeaderBoardPage />,
      },
      {
        path: 'forum',
        element: <Pages.ForumPage />,
      },
      {
        path: 'forum/:topicId',
        element: <Pages.ForumTopicPage />,
      },
      {
        path: 'profile',
        element: <Pages.ProfilePage />,
      },
      {
        path: '*',
        element: <Pages.NotFoundPage />,
      },
    ],
  },
])
