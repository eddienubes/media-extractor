<script setup lang="ts">
import { faker } from '@faker-js/faker'
import { ref } from 'vue'
import PhraseCard from './components/PhraseCard.vue'
const genMockCard = () => {
  return {
    id: faker.string.alphanumeric({ length: 10 }),
    text: faker.word.words({ count: 4 }),
    analysis: {
      definition: faker.word.words({ count: 7 }),
      lang: 'en-us',
      examples: faker.helpers.multiple(() => ({
        id: faker.string.alphanumeric(),
        text: faker.word.words({ count: 8 }),
      })),
    },
  }
}
const phrases = ref(faker.helpers.multiple(genMockCard, { count: 15 }))
const selected = ref<string | null>(null)
const onSelect = (id: string) => {
  if (selected.value === id) {
    selected.value = null
    return
  }
  selected.value = id
}
</script>

<template>
  <div class="grid">
    <PhraseCard
      v-for="phrase in phrases"
      :key="phrase.id"
      :text="phrase.text"
      :id="phrase.id"
      :analysis="phrase.analysis"
      :expanded="selected === phrase.id"
      @click="onSelect(phrase.id)"
    />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: left;
  align-items: flex-start;

  & > * {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 20em;
  }
}
</style>
