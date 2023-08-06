import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { StyledEngineProvider } from '@mui/material/styles'
import { routes } from '@/router/routes'
import { Provider } from 'react-redux'

import store from '@/store'
import '@/themes'

hydrate()

async function hydrate() {
  const router = createBrowserRouter(routes)

  ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <React.StrictMode>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} fallbackElement={<p>Loading</p>} />
        </StyledEngineProvider>
      </Provider>
    </React.StrictMode>
  )
}
