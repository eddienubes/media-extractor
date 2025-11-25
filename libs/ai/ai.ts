import { createXai } from '@ai-sdk/xai'
import { generateObject } from 'ai'
import { NodeCue } from 'subtitle'
import { z } from 'zod'

const system = `
  You're an expert in finding phrases, idioms, interesting vocabulary and peculiar slang in English-spoken movie and tv show subtitles.
  The English level of the students learning your output is C1.
`

export class Ai {
  async findContent(cues: NodeCue[]): Promise<any> {
    const prompt = cues
      .map((cue, idx) => `ID: ${idx}, TEXT: ${cue.data.text}`)
      .join(';')

    const response = await generateObject({
      model: createXai({
        apiKey:
          '',
      })('grok-4-1-fast-reasoning'),
      system: system,
      prompt: prompt,
      schemaName: 'Identified content',
      schemaDescription: 'Identified content inside subtitles',
      schema: z.array(
        z.object({
          cueId: z.string().describe('An id for a cue selected'),
          reason: z.string().describe('Why this cue was selected'),
          type: z.enum(['phrase', 'idiom', 'vocabulary', 'slang']),
        }),
      ),
    })
    return response.object
  }
}
