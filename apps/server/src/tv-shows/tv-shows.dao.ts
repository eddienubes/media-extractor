import { Dao } from '../bot/postgres/dao.js'
import { PgService } from '../bot/postgres/pg.service.js'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { tvShowsTable } from '../bot/postgres/schema.js'
import { faker } from '@faker-js/faker'

export type TvShowInsert = InferInsertModel<typeof tvShowsTable>
export type TvShowSelect = InferSelectModel<typeof tvShowsTable>

export class TvShowDao extends Dao {
  constructor(pgService: PgService) {
    super(pgService)
  }

  async createTestInstance(
    attrs: Partial<TvShowInsert>,
  ): Promise<TvShowSelect> {
    const hit = await this.client
      .insert(tvShowsTable)
      .values({
        tmdbId: faker.string.alphanumeric({ length: 10 }),
        title: faker.word.sample(),
        overview: faker.lorem.sentences(3),
        releaseDate: faker.date.anytime(),
        posterUrl: faker.internet.url(),
        ...attrs,
      })
      .returning()

    return hit[0]
  }

  async create(attrs: TvShowInsert): Promise<TvShowInsert> {
    const hit = await this.client.insert(tvShowsTable).values(attrs).returning()

    return hit[0]
  }

  async getById(uuid: string): Promise<TvShowSelect> {}
}
