import { chromium, Page, Browser as RootBrowser } from 'playwright'
import { PlaywrightBlocker } from '@ghostery/adblocker-playwright'
import { Disposable } from '../common/disposable.js'

export class Browser {
  constructor(
    private readonly browser: RootBrowser,
    private readonly blocker: PlaywrightBlocker,
  ) {}

  async page(): Promise<Disposable<Page>> {
    const page = await this.browser.newPage()
    // ad blocker doesn't work with patchright
    // await this.blocker.enableBlockingInPage(page)
    return new Disposable(page, (page) => page.close())
  }

  async close(): Promise<void> {
    await this.browser.close()
  }

  static async create(): Promise<Disposable<Browser>> {
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch)
    const browser = await chromium.launch({
      headless: true,
      channel: 'chrome',
      slowMo: 1000,
    })

    return new Disposable(new Browser(browser, blocker), (b) => b.close())
  }
}
