import { runOnCreate } from '@libs/container/container.js'
import { TmdbApi } from '@libs/tmdb/TmdbApi.js'
import { Env, MiddlewareHandler } from 'hono'
import { createMiddleware } from 'hono/factory'

export const createContainer = async () => {
  const apiKey = ''
  const tmdbApi = await runOnCreate(new TmdbApi(apiKey))

  return {
    tmdbApi,
  }
}
export interface HonoContainerEnv extends Env {
  Variables: {
    container: Container
  }
}
export type Container = Awaited<ReturnType<typeof createContainer>>
export const createContainerMiddleware =
  async (): Promise<MiddlewareHandler> => {
    const container = await createContainer()
    return createMiddleware<HonoContainerEnv>(async (c, next) => {
      c.set('container', container)
      await next()
    })
  }
