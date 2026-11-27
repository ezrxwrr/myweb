<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  localized,
  portfolioItems,
  type EraCategory,
  type EraKind,
  type GalleryImage,
} from '../data/portfolio'
import type { Language, TranslationCopy } from '../data/translations'

const props = defineProps<{
  era: EraKind
  copy: TranslationCopy['university'] | TranslationCopy['highschool']
  language: Language
}>()

const emit = defineEmits<{
  'open-gallery': [images: GalleryImage[], index?: number]
}>()

const activeCategory = ref<EraCategory | null>(null)
const activeItemId = ref<string | null>(null)
const sectionElement = ref<HTMLElement | null>(null)
let cardObserver: IntersectionObserver | undefined
let revealScrollRoot: HTMLElement | null = null
let previousScrollTop = 0
let scrollDirection: 'up' | 'down' = 'down'
const items = () => activeCategory.value ? portfolioItems[props.era][activeCategory.value] : []
const activeItem = computed(() => items().find((item) => item.id === activeItemId.value) ?? null)

function updateScrollDirection() {
  if (!revealScrollRoot) return

  const currentScrollTop = revealScrollRoot.scrollTop
  if (currentScrollTop !== previousScrollTop) {
    scrollDirection = currentScrollTop > previousScrollTop ? 'down' : 'up'
    previousScrollTop = currentScrollTop
  }
}

function toggleCategory(category: EraCategory) {
  activeCategory.value = activeCategory.value === category ? null : category
  activeItemId.value = null
}

function toggleItem(itemId: string) {
  activeItemId.value = activeItemId.value === itemId ? null : itemId
}

function observeCards() {
  if (!cardObserver) {
    revealScrollRoot = document.querySelector<HTMLElement>('[data-overlayscrollbars-viewport]')
    if (!revealScrollRoot) return

    previousScrollTop = revealScrollRoot.scrollTop
    revealScrollRoot.addEventListener('scroll', updateScrollDirection, { passive: true })

    cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.setAttribute('data-reveal-direction', scrollDirection)
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        } else {
          entry.target.classList.remove('is-visible')
        }
      })
    }, { root: revealScrollRoot, rootMargin: '40px 0px', threshold: 0.08 })
  }

  sectionElement.value?.querySelectorAll<HTMLElement>('.era-selected-card[data-reveal]:not(.is-visible)').forEach((card) => {
    cardObserver?.observe(card)
  })
}

onMounted(observeCards)
watch([activeCategory, activeItemId], async () => {
  await nextTick()
  observeCards()
})
onUnmounted(() => {
  cardObserver?.disconnect()
  revealScrollRoot?.removeEventListener('scroll', updateScrollDirection)
})
</script>

<template>
  <section ref="sectionElement" :id="era === 'university' ? 'kuliah' : 'sma'" class="content-section era-section page-gutter">
    <div class="section-heading" data-reveal>
      <div class="section-index mono">{{ copy.index }}</div>
      <div class="section-intro">
        <h2 class="display-heading section-title" v-html="copy.heading"></h2>
        <p>{{ copy.intro }}</p>
      </div>
      <span class="era-stamp mono">{{ era === 'university' ? '2024—NOW' : '2022—2024' }}</span>
    </div>

    <div class="era-toolbar" data-reveal>
      <div class="era-tabs" role="group" :aria-label="copy.heading.replace(/<[^>]*>/g, '')">
        <button
          :id="`${era}-work-tab`"
          class="era-tab mono"
          :class="{ 'is-active': activeCategory === 'work' }"
          type="button"
          :aria-expanded="activeCategory === 'work'"
          :aria-controls="`${era}-tabpanel`"
          @click="toggleCategory('work')"
        >
          <span class="era-tab-number" aria-hidden="true">01</span>
          <span class="era-tab-label">{{ copy.workTab }}</span>
          <span class="era-tab-indicator" aria-hidden="true">{{ activeCategory === 'work' ? '−' : '+' }}</span>
        </button>
        <button
          :id="`${era}-awards-tab`"
          class="era-tab mono"
          :class="{ 'is-active': activeCategory === 'awards' }"
          type="button"
          :aria-expanded="activeCategory === 'awards'"
          :aria-controls="`${era}-tabpanel`"
          @click="toggleCategory('awards')"
        >
          <span class="era-tab-number" aria-hidden="true">02</span>
          <span class="era-tab-label">{{ copy.awardTab }}</span>
          <span class="era-tab-indicator" aria-hidden="true">{{ activeCategory === 'awards' ? '−' : '+' }}</span>
        </button>
      </div>
      <div class="era-toolbar-note mono">{{ copy.videoLabel }}</div>
    </div>

    <p v-if="!activeCategory" class="era-select-note mono">{{ copy.selectCategory }}</p>
    <div
      :id="`${era}-tabpanel`"
      class="era-grid"
      :aria-labelledby="activeCategory ? `${era}-${activeCategory}-tab` : undefined"
      :hidden="!activeCategory"
    >
      <template v-if="activeCategory">
        <div class="era-item-list">
          <div v-for="(item, index) in items()" :key="item.id" class="era-item-row">
            <button
              :id="`${era}-${item.id}-toggle`"
              class="era-item-toggle"
              type="button"
              :aria-expanded="activeItemId === item.id"
              :aria-controls="activeItemId === item.id ? `${era}-${item.id}-detail` : undefined"
              @click="toggleItem(item.id)"
            >
              <span class="era-item-number mono">0{{ index + 1 }}</span>
              <span class="era-item-title">{{ localized(item.title, language) }}</span>
              <span class="era-item-meta mono">{{ localized(item.roleOrCategory, language) }} · {{ item.year }}</span>
            </button>
            <article
              v-if="activeItemId === item.id"
              :id="`${era}-${item.id}-detail`"
              class="era-selected-card"
              data-reveal
              role="region"
              :aria-labelledby="`${era}-${item.id}-toggle`"
            >
              <div class="era-selected-media">
                <button
                  class="era-selected-preview image-frame"
                  :class="{ 'is-document': item.mediaType === 'pdf' || activeCategory === 'awards' }"
                  type="button"
                  :aria-label="`${copy.viewLabel}: ${localized(item.title, language)}`"
                  @click="emit('open-gallery', item.galleryImages ?? [{ src: item.imageSrc, alt: item.title }])"
                >
                  <iframe
                    v-if="item.mediaType === 'pdf'"
                    :src="`${item.imageSrc}#toolbar=0&navpanes=0&view=FitH`"
                    :title="localized(item.title, language)"
                    loading="lazy"
                    tabindex="-1"
                  ></iframe>
                  <img v-else :src="item.imageSrc" :alt="localized(item.title, language)" loading="lazy" />
                  <span class="image-open mono">{{ copy.viewLabel }} ↗</span>
                </button>
                <a
                  v-if="item.externalUrl && item.externalUrl.includes('instagram.com')"
                  class="media-external-link mono"
                  :href="item.externalUrl"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>INTERFACE · @OSJURILKOM</span>
                  <strong>{{ copy.mediaLinkLabel }} ↗</strong>
                </a>
              </div>
              <div class="era-selected-copy">
                <div class="era-card-meta mono">
                  <span>{{ localized(item.roleOrCategory, language) }}</span>
                </div>
                <h3>{{ localized(item.title, language) }}</h3>
                <p>{{ localized(item.description, language) }}</p>
                <p v-if="item.credit" class="era-credit"><em>{{ localized(item.credit, language) }}</em></p>
              </div>
            </article>
          </div>
        </div>
        <p v-if="!activeItem" class="era-item-hint mono">{{ copy.selectItem }}</p>
        <p v-else class="era-note mono">{{ copy.emptyNote }}</p>
      </template>
    </div>
  </section>
</template>
