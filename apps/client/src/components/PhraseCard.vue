<script setup lang="ts">
import type { Phrase } from '@/api/api'

export interface PhraseCardProps extends Phrase {
  expanded?: boolean
}

const props = withDefaults(defineProps<PhraseCardProps>(), {
  expanded: false,
})
const emit = defineEmits<{
  click: [id: string]
}>()

const click = (id: string) => {
  emit('click', id)
}
</script>

<template>
  <div class="card">
    <div class="phrase">
      <div class="value">
        {{ props.text }}
      </div>
      <div v-if="!!props.analysis?.lang" class="lang">
        {{ props.analysis.lang }}
      </div>
    </div>
    <div v-if="!!props.analysis" class="analysis">
      <div>
        <p>{{ props.analysis.definition }}</p>
      </div>
      <div v-if="expanded">
        <p v-for="example in props.analysis.examples" :key="example.id">
          {{ example.text }}
        </p>
      </div>
    </div>
    <button @click="click(id)" class="expand-btn">
      <span v-if="!expanded" class="pi pi-angle-down"></span>
      <span v-if="expanded" class="pi pi-angle-up"></span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/variables.scss' as var;

.card {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: var.$border-radius;

  &:hover {
    box-shadow: 5px 5px var.$shadow-color;
  }

  .phrase {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    padding: 8px;
    background: var.$background-color;

    display: flex;
    gap: var.$gap;
    justify-content: space-between;

    & .lang {
      white-space: nowrap;
    }
  }

  .analysis {
    display: flex;
    flex-direction: column;
    gap: var.$gap;
    flex-grow: 1;
    padding: 16px 8px 8px 8px;
    border-left: 1px solid var.$border-light;
    border-right: 1px solid var.$border-light;
    background: transparent;
  }

  .expand-btn {
    min-width: 100%;
    width: 100%;
    border: none;
    padding: 8px;
    cursor: pointer;
    background: none;
    border-left: 1px solid var.$border-light;
    border-right: 1px solid var.$border-light;
    border-bottom: 1px solid var.$border-light;

    & > span {
      visibility: hidden;
    }

    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  &:hover .expand-btn span {
    visibility: visible;
  }
}
</style>
