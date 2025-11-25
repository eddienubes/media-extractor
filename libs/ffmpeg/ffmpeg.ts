import ffmpegBinary from '@ffmpeg-installer/ffmpeg'
import ffmprobeBinary from '@ffprobe-installer/ffprobe'
import * as zx from 'zx'
import fs from 'node:fs/promises'
import stream from 'node:stream'

export class Ffmpeg {
  private readonly ffmpegPath: string
  private readonly ffprobePath: string

  constructor() {
    this.ffmpegPath = ffmpegBinary.path
    this.ffprobePath = ffmprobeBinary.path
  }

  async probeStream(url: string): Promise<any> {
    const result =
      await zx.$`${this.ffprobePath} -v quiet -print_format json -show_streams ${url}`

    return JSON.parse(result.stdout)
  }

  /**
   * @param url ....//...com/kasjdf.m3u8
   * @param start - Start time (e.g., "00:01:30" or "90")
   * @param end - End time (e.g., "00:02:45" or "165")
   */
  hlsToMp4(url: string, start: number, end: number): stream.PassThrough {
    const passthrough = new stream.PassThrough()
    const duration = end - start
    // zx.$`${this.ffmpegPath} -ss ${start} -t ${duration} -reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5 -timeout 10000000 -i ${url} -c:v copy -c:a aac -f matroska pipe:1`.pipe(
    //   passthrough,
    // )
    zx.$`${this.ffmpegPath} -ss ${start} -t ${duration} -reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5 -timeout 10000000 -i ${url} -c:v copy -c:a aac -f mp4 -movflags frag_keyframe+empty_moov pipe:1`.pipe(
      passthrough,
    )
    return passthrough
  }

  static async withPermissions(): Promise<Ffmpeg> {
    await fs.chmod(ffmpegBinary.path, '777')
    await fs.chmod(ffmprobeBinary.path, '777')
    return new Ffmpeg()
  }
}
