import { Browser } from '../browser/browser.js'
import { HdRezkaScraper } from './hdrezka.scraper.js'
import { Disposable } from '../common/disposable.js'
import { setTimeout } from 'node:timers/promises'
import { Ffmpeg } from '../ffmpeg.js'
import subtitle from 'subtitle'
import axios from 'axios'
import stream from 'node:stream'
import fs from 'node:fs/promises'

describe(HdRezkaScraper.name, () => {
  let browser: Disposable<Browser>
  let scraper: HdRezkaScraper
  let ffmpeg: Ffmpeg

  beforeAll(async () => {
    browser = await Browser.create()
    scraper = new HdRezkaScraper(browser.data)
    ffmpeg = await Ffmpeg.withPermissions()
  })

  afterAll(async () => {
    browser.dispose()
  })

  describe(HdRezkaScraper.prototype.search.name, () => {
    it('should scrape', async () => {
      const result = {
        m3u8Url:
          'https://hronos.stream.voidboost.cc/bc50be7fe79d18de1d5a614317378235:2025112518:UjRUMW03YVpRczhWcmV1eXBaL3pwT1J5cVlmV1NwQitzeThaRXlVYmlydEpVOXhwcTZNSVdLYVdZbjNwV01jWnk1N1NwUk0yWnltYUNVZUdqWVlWZ0xVa1ZqbW1HTmpEODdQUXpOL2FrZms9/1/0/3/0/4/7/f17i1.mp4:hls:manifest.m3u8',
        subtitlesUrl:
          'https://static.voidboost.com/view/akIB4V12Oz0dSVJ9EEVuWg/1764083775/1/0/3/0/4/7/ceu92y24hi.vtt',
      }
      // const hits = await scraper.search('rick &')
      // const result = await scraper.streamTvShow(hits[0], 3, 3)
      // console.log(result)

      // const res = await ffmpeg.probeStream(result.m3u8Url)
      // console.log(res)
      const readable = ffmpeg.hlsToMp4(result.m3u8Url, 500, 561)
      console.log('done 1')

      await fs.writeFile('video.mp4', readable)
      console.log('done 2')

      await setTimeout(300000)
    })
  })
})
