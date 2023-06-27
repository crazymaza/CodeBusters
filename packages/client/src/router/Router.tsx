import { RouterProvider } from 'react-router-dom'
import routes from './routes'

const Router = () => {
  return <RouterProvider router={routes} fallbackElement={<p>Loading</p>} />
}

export default Router
