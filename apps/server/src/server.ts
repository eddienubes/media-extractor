import { Hono } from 'hono'
import { searchController } from './media/search.controller.js'
import { serve } from '@hono/node-server'
import { createContainerMiddleware } from './container.js'

const main = async (): Promise<void> => {
  const app = new Hono()
  const containerMiddleware = await createContainerMiddleware()
  app.use(containerMiddleware)
  app.route('/', searchController)

  const server = serve({
    fetch: app.fetch,
    port: 3000,
  })

  process.on('SIGINT', () => {
    server.close()
    process.exit(0)
  })
  process.on('SIGTERM', () => {
    server.close((err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      process.exit(0)
    })
  })
}

void main()
