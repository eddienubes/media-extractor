import { Browser } from '../browser/browser.js'
import { HdRezkaScraper } from './hdrezka.scraper.js'
import { Disposable } from '../common/disposable.js'
import { setTimeout } from 'node:timers/promises'
import { Ffmpeg } from '../ffmpeg/ffmpeg.js'
import subtitle from 'subtitle'
import axios from 'axios'
import stream from 'node:stream'
import fs from 'node:fs/promises'
import { Subtitles } from '../subtitles/subtitles.js'
import { Ai } from '../ai/ai.js'

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
      // const result = {
      //   m3u8Url:
      //     'https://hronos.stream.voidboost.cc/b69a5d32d8fbafab9a63d2a514be216c:2025112617:UjRUMW03YVpRczhWcmV1eXBaL3pwT1J5cVlmV1NwQitzeThaRXlVYmlydEpVOXhwcTZNSVdLYVdZbjNwV01jWlduaEdnWE5kYXRqdDFoNitibFpFTDI3VU1tVkJ3ckxtM0thcGlqdURQbms9/1/0/3/0/4/7/f17i1.mp4:hls:manifest.m3u8',
      //   subtitlesUrl:
      //     'https://static.voidboost.com/view/fDGDAXNyXBFJGXVPiUkKAg/1764168562/1/0/3/0/4/7/ceu92y24hi.vtt',
      // }
      const hits = await scraper.search('Stranger Things')
      const result = await scraper.streamTvShow(hits[0], 3, 3)

      console.log(result)

      const res = await ffmpeg.probeStream(result.m3u8Url)

      console.log(res)
      const readable = ffmpeg.hlsToMp4(result.m3u8Url, 500, 561)
      console.log('done 1')

      await fs.writeFile('video.mp4', readable)
      console.log('done 2')

      // const ai = new Ai()
      // const subs = await Subtitles.fromUrl(result.subtitlesUrl)
      // const idioms = await ai.findContent(subs.cues.slice(20, 150))
      // console.log(idioms)

      await setTimeout(300000)
    })
  })
})
