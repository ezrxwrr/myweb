<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import type { GalleryImage } from '../data/portfolio'
import type { Language, TranslationCopy } from '../data/translations'

const props = defineProps<{
  images: GalleryImage[]
  activeIndex: number
  language: Language
  copy: TranslationCopy['modal']
}>()

const emit = defineEmits<{
  close: []
  change: [index: number]
}>()

const activeImage = computed(() => props.images[props.activeIndex])

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowRight' && props.activeIndex < props.images.length - 1) emit('change', props.activeIndex + 1)
  if (event.key === 'ArrowLeft' && props.activeIndex > 0) emit('change', props.activeIndex - 1)
}

onMounted(() => {
  document.body.classList.add('modal-open')
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.body.classList.remove('modal-open')
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="modal-backdrop" role="presentation" @click.self="emit('close')">
    <section class="image-modal" role="dialog" aria-modal="true" :aria-label="`${copy.preview}: ${activeImage.alt[language]}`">
      <div class="modal-topline mono">
        <span>{{ copy.preview }} · {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(images.length).padStart(2, '0') }}</span>
        <button class="modal-close" type="button" :aria-label="copy.close" @click="emit('close')">{{ copy.close }} <span>×</span></button>
      </div>
      <figure class="modal-figure">
        <iframe
          v-if="activeImage.type === 'pdf'"
          :src="`${activeImage.src}#toolbar=1&navpanes=0`"
          :title="activeImage.alt[language]"
        ></iframe>
        <img v-else :src="activeImage.src" :alt="activeImage.alt[language]" />
        <figcaption class="mono">{{ activeImage.alt[language] }}</figcaption>
      </figure>
      <div v-if="images.length > 1" class="modal-controls">
        <button type="button" :disabled="activeIndex === 0" @click="emit('change', activeIndex - 1)">← {{ copy.previous }}</button>
        <button type="button" :disabled="activeIndex === images.length - 1" @click="emit('change', activeIndex + 1)">{{ copy.next }} →</button>
      </div>
    </section>
  </div>
</template>
