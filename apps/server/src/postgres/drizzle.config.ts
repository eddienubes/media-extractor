import { defineConfig } from 'drizzle-kit'
import path from 'node:path'
import { loadConfig } from '../config.js'

const config = loadConfig()

// https://github.com/drizzle-team/drizzle-orm/issues/3807
// Remove first slash to fix the issue above.
const migrationsPath = path.relative('.', path.resolve(__dirname, 'migrations'))
const schemaPath = path.relative('.', path.resolve(__dirname, 'schema.ts'))

export default defineConfig({
  dialect: 'postgresql',
  schema: schemaPath,
  out: migrationsPath,
  migrations: {
    table: config.postgres.migrationsTable,
    schema: config.postgres.migrationsSchema,
  },
  dbCredentials: {
    url: config.postgres.url,
  },
})
