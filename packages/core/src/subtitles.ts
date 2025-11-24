import axios from 'axios'
import subtitle, { NodeList } from 'subtitle'

export class Subtitles {
  private readonly subs: NodeList

  constructor(subStr: string) {
    this.subs = subtitle.parseSync(subStr)
  }

  static async fromUrl(url: string): Promise<Subtitles> {
    const subtitlesRes = await axios.get(url)
    return new Subtitles(subtitlesRes.data)
  }
}
