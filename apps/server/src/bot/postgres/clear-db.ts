import { PgService } from './pg.service.js'

const main = async (): Promise<void> => {
  const config = loadConfig()
  const pg = new PgService(config.postgres.url)

  await pg.dropSchema()
  process.exit(0)
}

void main()
