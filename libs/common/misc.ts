import path from 'node:path'
import url from 'node:url'

export const dirname = (filename: string) =>
  path.dirname(url.fileURLToPath(filename))
