import type * as express from 'express'
import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { createReduxStore } from '@/store'
import { StyledEngineProvider } from '@mui/material/styles'
import { UserInfo, ThemeType } from '@/api/User/types'
import { UserApi } from '@/api'

import '@/themes'
import { childrenRoutes, routes } from '@/router/routes'
import { matchPath } from 'react-router-dom'

export async function render(
  request: express.Request,
  url: string,
  yandexApi: { getCurrent: () => Promise<UserInfo> }
) {
  const { query } = createStaticHandler(routes)
  const remixRequest = createFetchRequest(request)
  const context = await query(remixRequest)

  if (context instanceof Response) {
    throw context
  }

  const cookies = request?.headers?.cookie

  let userInfo: UserInfo | null = null
  let themeName: ThemeType = 'light'

  try {
    userInfo = await yandexApi.getCurrent()
  } catch (error) {
    console.log('current user in undefined')
  }

  if (userInfo) {
    try {
      const { theme } = await new UserApi(cookies).getTheme(userInfo.id)

      themeName = theme
    } catch (error) {
      console.log('theme is not set for user')
    }
  }

  const [pathname] = url.split('?')
  const store = createReduxStore({ user: { userInfo, themeName } }, cookies)
  const router = createStaticRouter(routes, context)

  const currentRoute = childrenRoutes.find(({ path }) =>
    matchPath(pathname, path)
  )
  const { loader } = currentRoute || {}

  if (loader) {
    await loader(store.dispatch)
  }

  const initialState = store.getState()

  const appHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <StaticRouterProvider router={router} context={context} />
      </StyledEngineProvider>
    </Provider>
  )

  return [initialState, appHtml]
}

export function createFetchRequest(req: express.Request): Request {
  const origin = `${req.protocol}://${req.get('host')}`
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}
