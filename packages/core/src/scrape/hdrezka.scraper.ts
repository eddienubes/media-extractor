import { Browser } from '../browser/browser.js'
import axios from 'axios'
import * as linkedom from 'linkedom'
import { HLS_STREAM_EXTENSION, SUBTITLES_EXTENSION } from './constants.js'
import { Page } from 'playwright'

interface HdRezkaStreamResult {
  m3u8Url: string
  subtitlesUrl: string
}

export class HdRezkaScraper {
  private readonly baseUrl = 'https://hdrezka-home.tv'
  private readonly client = axios.create({
    baseURL: this.baseUrl,
  })

  constructor(private readonly browser: Browser) {}

  async search(term: string): Promise<string[]> {
    const res = await this.client.post(
      '/engine/ajax/search.php',
      `q=${encodeURIComponent(term)}`,
    )
    const dom = linkedom.parseHTML(res.data)
    const links = dom.document.querySelectorAll('a')
    return Array.from(links).map((l) => l.href)
  }

  async streamTvShow(
    url: string,
    season: number,
    episode: number,
  ): Promise<HdRezkaStreamResult> {
    await using page = await this.browser.page()
    const interceptedM3u8Url: string[] = []
    const interceptedSubtitleUrls: string[] = []
    page.data.on('request', async (req) => {
      const url = req.url()
      if (url.includes(HLS_STREAM_EXTENSION)) {
        interceptedM3u8Url.push(url)
        return req
      }
      if (url.includes(SUBTITLES_EXTENSION)) {
        interceptedSubtitleUrls.push(url)
        return req
      }
      return req
    })
    await page.data.goto(url)
    // Select English
    await page.data.getByRole('link', { name: 'Оригинал (+субтитры)' }).click()
    // Season
    await page.data.getByRole('link', { name: `Сезон ${season}` }).click()
    // Episode
    await page.data.getByRole('link', { name: `Серия ${episode}` }).click()

    // await page.data.pause();

    await this.selectQuality(page.data)
    await this.selectSubtitles(page.data)

    await page.data.locator('#oframecdnplayer').click()

    console.log('total urls found', interceptedM3u8Url)

    const m3u8Url = interceptedM3u8Url[interceptedM3u8Url.length - 1]
    const subtitlesUrl =
      interceptedSubtitleUrls[interceptedSubtitleUrls.length - 1]

    return {
      m3u8Url,
      subtitlesUrl,
    }
  }

  private async selectQuality(page: Page): Promise<void> {
    // click gear icon
    await page.locator('pjsdiv:nth-child(17) > pjsdiv:nth-child(3)').click()

    // click quality sub-menu
    await page
      .locator('#cdnplayer_settings > :nth-child(1) > :nth-child(1)')
      .click()

    await page
      .locator('pjsdiv')
      .filter({ hasText: '1080p Ultra' })
      .nth(4)
      .click()
  }

  private async selectSubtitles(page: Page): Promise<void> {
    // open subtitles selector
    await page.locator('#cdnplayer_control_cc > pjsdiv:nth-child(3)').click()

    // select English
    await page.locator('pjsdiv').filter({ hasText: 'English' }).nth(4).click()
  }
}
