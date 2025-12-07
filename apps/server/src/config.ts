import { dirname } from '@libs/common/misc'
import path from 'node:path'
import { z } from 'zod'

const configSchema = z.object({
  tmdb: z.object({
    apiKey: z.string(),
  }),
  postgres: z.object({
    url: z.string(),
    migrationsTable: z.string(),
    migrationsSchema: z.string(),
  }),
})

export const loadConfig = () => {
  const envPath = path.resolve(dirname(import.meta.url), '..', '.env')
  process.loadEnvFile(envPath)

  try {
    const config = configSchema.parse({
      tmdb: {
        apiKey: process.env.TMDB_API_KEY,
      },
      postgres: {
        url: process.env.PG_URL,
        migrationsTable: 'drizzle_migrations',
        migrationsSchema: 'public',
      },
    })
    return config
  } catch (e) {
    console.log(`${loadConfig.name}: config validation error`)
    throw e
  }
}
