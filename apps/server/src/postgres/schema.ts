import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

const timestamps = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
}

export const tvShowsTable = pgTable('tv_shows', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  tmdbId: varchar('tmdb_id').notNull().unique(),
  title: varchar().notNull(),
  overview: varchar().notNull(),
  releaseDate: timestamp('release_date').notNull(),
  posterUrl: varchar('poster_url').notNull(),
  ...timestamps,
})

export const tvShowEpisodesTable = pgTable('tv_show_episodes', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  tvShowId: uuid('tv_show_id')
    .notNull()
    .references(() => tvShowsTable.uuid),
  season: integer().notNull(),
  episode: integer().notNull(),
  ...timestamps,
})

export const tvShowEpisodesRelations = relations(
  tvShowEpisodesTable,
  ({ many }) => ({
    subtitles: many(subtitlesTable),
  }),
)

export const tvShowsRelations = relations(tvShowsTable, ({ many }) => ({
  episodes: many(tvShowEpisodesTable),
}))

export const moviesTable = pgTable('movies', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  tmdbId: varchar('tmdb_id').notNull().unique(),
  title: varchar().notNull(),
  overview: varchar().notNull(),
  releaseDate: timestamp('release_date').notNull(),
  posterUrl: varchar('poster_url').notNull(),
  ...timestamps,
})

export const moviesRelations = relations(moviesTable, ({ many }) => ({
  subtitles: many(subtitlesTable),
}))

export const phrasesTable = pgTable('phrases', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  hash: varchar().notNull().unique(),
  text: varchar().notNull(),
  ...timestamps,
})

export const phrasesRelations = relations(phrasesTable, ({ many }) => ({
  examples: many(phraseExamplesTable),
}))

export const phraseExamplesTable = pgTable('phrase_examples', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  hash: varchar().notNull().unique(),
  text: varchar().notNull(),
  phraseId: uuid('phrase_id')
    .notNull()
    .references(() => phrasesTable.uuid),
  ...timestamps,
})

export const phraseExamplesRelations = relations(
  phraseExamplesTable,
  ({ many }) => ({
    clips: many(clipsTable),
  }),
)

export const subtitlesTable = pgTable('subtitles', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  movieId: uuid('movie_id').references(() => moviesTable.uuid),
  episodeId: uuid('episode_id').references(() => tvShowEpisodesTable.uuid),
  hash: varchar().notNull(),
  text: varchar().notNull(),
  ...timestamps,
})

export const clipsTable = pgTable('clips', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  startsAt: varchar('starts_at').notNull(),
  endsAt: varchar('ends_at').notNull(),
  durationSec: varchar('duration_sec').notNull(),
  quality: varchar('quality').notNull(),
  movieId: uuid('movie_id').references(() => moviesTable.uuid),
  episodeId: uuid('episode_id').references(() => tvShowEpisodesTable.uuid),
  ...timestamps,
})
