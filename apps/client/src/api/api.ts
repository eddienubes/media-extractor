export interface Example {
  id: string
  text: string
}

export interface Phrase {
  id: string;
  text: string
  analysis?: {
    lang: string
    definition: string
    examples: Example[]
  }
}
