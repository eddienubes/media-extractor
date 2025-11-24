import { setTimeout } from 'node:timers/promises'
import { Browser } from './browser.js'

describe(Browser.name, () => {
  it.only('should scrape a website', async () => {
    const browser = await Browser.create()
    const page = await browser.page()

    page.on('request', async (request) => {
      const url = request.url()
      if (url.includes('m3u8')) {
        console.log('m3u8 URL', url)
      }
    })

    // const qualities = [
    //   'Качество360p',
    //   'Качество480p',
    //   'Качество720p',
    //   'Качество1080p',
    //   'Качество1080p Ultra',
    // ]
    // for (const quality of qualities) {
    //   const locator = page.locator('pjsdiv').filter({ hasText: quality })
    //   if (await locator.isVisible()) {
    //     await locator.click()
    //   }
    // }

    // await page.locator('#oframecdnplayer').click()
    await setTimeout(100000)
    // await page.pause()
  })
})
