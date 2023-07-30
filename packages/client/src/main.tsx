import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import { StyledEngineProvider } from '@mui/material/styles'
// import '@/themes'

// import store from '@/store'

// import { Provider } from 'react-redux'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    {/* <Provider store={store}>
      <StyledEngineProvider injectFirst> */}
    <App />
    {/* </StyledEngineProvider>
    </Provider> */}
  </React.StrictMode>
)
