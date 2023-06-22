import { RouterProvider } from 'react-router-dom'
import routes from './routes'

// TODO Добавить обработку приватных и публичных роутов
const Router = () => {
  return <RouterProvider router={routes} fallbackElement={<p>Loading</p>} />
}

export default Router
