import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { createProxyMiddleware } from 'http-proxy-middleware'

import cookieParser from 'cookie-parser'
import bodyParser = require('body-parser')

dotenv.config()

import compression from 'compression'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { dbConnect } from './db'
import { apiRouter } from './database'
import { themeApiRouter } from './database/userTheme'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()

  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/entry.server.cjs')

  const bdyParser = bodyParser.json()

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(compression())
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  )

  app.use('/api/forum', apiRouter)
  app.use('/api/theme', bdyParser, themeApiRouter)

  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      let render: (request: express.Request, url: string) => Promise<string>

      if (isDev()) {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)

        render = (
          await vite!.ssrLoadModule(path.resolve(srcPath, 'entry.server.tsx'))
        ).render
      } else {
        const serviceWorkerFiles = [
          '/serviceWorker.js',
          '/manifest.webmanifest',
          '/registerSW.js',
        ]

        if (serviceWorkerFiles.includes(req.baseUrl)) {
          res.sendFile(path.resolve(distPath, req.baseUrl.replace('/', '')))
          return
        }

        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )

        render = (await import(ssrClientPath)).render
      }

      const [initialState, appHtml] = await render(req, url)
      const initStateSerialized = JSON.stringify(initialState).replace(
        /</g,
        '\\u003c'
      )

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('<!--store-data-->', initStateSerialized)

      res.setHeader('Content-Type', 'text/html')

      return res.status(200).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }

    return app
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })

  dbConnect()
}

startServer()
