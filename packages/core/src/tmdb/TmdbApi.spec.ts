import { TmdbApi } from './TmdbApi.js'
import {
  makeStandardFetcher,
  targets,
  makeProviders,
  ScrapeMedia,
  ShowMedia,
  buildProviders,
  Fetcher,
} from '@p-stream/providers'
import util from 'node:util'

const fetcher: Fetcher = async (url, opts) => {
  console.log('fetcher', url, opts)

  const standardFetcher = makeStandardFetcher(fetch)
  const res = await standardFetcher(url, opts)
  console.log('std fetcher response', res)
  return res;
}

const providers = buildProviders()
  .setTarget(targets.ANY)
  .setFetcher(fetcher)
  .addSource('hdrezka')
  .enableConsistentIpForRequests()
  .build()

describe(TmdbApi.name, () => {
  const api = new TmdbApi('5ca16d9e86f95a55ccbfba391a40d8c8')
  describe('searchTvShow', () => {
    it('should search for a tv show', async () => {
      const hits = await api.searchTvShow('Travelers')

      console.log(util.inspect(hits, { depth: null }))
    })
  })

  describe('searchTrending', () => {
    it('should search trending', async () => {
      const hits = await api.searchTrending('Severance')

      console.log(hits)
    })
  })

  describe('getTvShow', () => {
    it.only('should ', async () => {
      // rick & morty
      const showId = 60625
      const seasonNumber = 4
      const episodeNumber = 6
      const show = await api.getTvShow(showId)
      const season = await api.getTvShowSeason(showId, seasonNumber)
      const episode = season.episodes?.[episodeNumber]

      const externalIds = await api.getTvShowExternalIds(show.id)
      console.log('external ids', externalIds)

      const media: ScrapeMedia = {
        type: 'show',
        imdbId: externalIds.imdb_id,
        season: {
          number: seasonNumber,
          tmdbId: season.id.toString(),
          title: season.name as string,
        },
        episode: {
          number: episode?.episode_number as number,
          tmdbId: episode?.id?.toString() as string,
        },
        releaseYear: new Date(show.first_air_date as string).getFullYear(),
        title: show.name as string,
        tmdbId: showId.toString(),
      }

      console.log(media)
      console.log(providers.listSources())

      const res = await providers.runAll({
        media,
      })

      console.log(res)
    })
  })

  // it('should another test', async () => {
  //   const media: ShowMedia = {
  //     type: 'show',
  //     season: { number: 1, tmdbId: '79823' },
  //     episode: { number: 2, tmdbId: '1230809' },
  //     releaseYear: 2016,
  //     title: 'Travelers',
  //     tmdbId: '67683',
  //     imdbId: 'tt5651844',
  //   }
  // })
})
