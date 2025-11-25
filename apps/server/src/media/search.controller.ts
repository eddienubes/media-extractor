import { Hono } from 'hono'
import { HonoContainerEnv } from '../container.js'

const searchController = new Hono<HonoContainerEnv>().basePath('/media')
searchController.get('/search', async (c) => {
  const query = c.req.query('q')
  const trending = await c.var.container.tmdbApi.searchTvShow(query || '')
  return c.json(trending)
})
export { searchController }
