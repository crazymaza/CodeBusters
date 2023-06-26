import { RouterProvider } from 'react-router-dom'
import routes from './routes'

const Router = () => {
  // TODO: обернуть в authcontext
  return <RouterProvider router={routes} fallbackElement={<p>Loading</p>} />
}

export default Router
