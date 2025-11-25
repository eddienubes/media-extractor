import axios from 'axios'
import subtitle, { NodeCue } from 'subtitle'

export class Subtitles {
  readonly cues: NodeCue[]

  constructor(subStr: string) {
    this.cues = subtitle.parseSync(subStr).filter((s) => s.type === 'cue')
  }

  static async fromUrl(url: string): Promise<Subtitles> {
    const subtitlesRes = await axios.get(url)
    return new Subtitles(subtitlesRes.data)
  }
}
