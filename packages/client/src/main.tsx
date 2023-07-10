import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StyledEngineProvider } from '@mui/material/styles'
import '@/themes'

import store from '@/store'

import { Provider } from 'react-redux'
import { ErrorBoundary } from '@/components'
import { ErrorPage } from '@/pages'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary
      errorComponent={<ErrorPage topMessage={'Что-то пошло не так...'} />}>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)
