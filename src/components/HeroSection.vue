<script setup lang="ts">
import { computed } from 'vue'
import { getMoonLitPath, getMoonPhaseIndex, useMoonPhase } from '../composables/useMoonPhase'
import type { Language } from '../data/translations'

const props = defineProps<{
  copy: {
    heading: string
    summary: string
    projectsCta: string
    githubCta: string
    scroll: string
    ticker: readonly string[]
    sunLabel: string
    sunAlt: string
    moonAlt: string
    moonPhases: readonly string[]
  }
  language: Language
  theme: 'dark' | 'light'
}>()

const { date: localDate, phase: moonPhase } = useMoonPhase()
const phaseLabel = computed(() => props.copy.moonPhases[getMoonPhaseIndex(moonPhase.value)])
const dateLabel = computed(() => new Intl.DateTimeFormat(
  props.language === 'ID' ? 'id-ID' : 'en-GB',
  { day: '2-digit', month: 'short', year: 'numeric' },
).format(localDate.value).toUpperCase())
const celestialLabel = computed(() => props.theme === 'dark' ? phaseLabel.value : props.copy.sunLabel)
const celestialAlt = computed(() => props.theme === 'dark'
  ? `${props.copy.moonAlt}: ${phaseLabel.value}`
  : props.copy.sunAlt)
const moonSurfacePath = computed(() => getMoonLitPath(moonPhase.value, 250, 170))

const tickerLoop = (items: readonly string[]) => [...items, ...items]
</script>

<template>
  <section id="top" class="hero-section page-gutter">
    <div class="hero-layout">
      <div class="hero-copy" data-reveal>
        <h1 class="display-heading hero-heading" v-html="props.copy.heading"></h1>
        <p class="hero-summary">{{ props.copy.summary }}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#projects">
            {{ props.copy.projectsCta }} <span aria-hidden="true">↘</span>
          </a>
          <a class="button button-text" href="https://github.com/ezrxwrr" target="_blank" rel="noreferrer">
            {{ props.copy.githubCta }} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <a class="hero-scroll mono" href="#projects"><span class="scroll-line"></span>{{ props.copy.scroll }}</a>
      </div>

      <div class="hero-art" data-reveal :aria-label="celestialAlt">
        <div class="hero-art-grid"></div>
        <svg v-if="props.theme === 'light'" class="celestial-artwork solar-artwork" viewBox="0 0 500 500" aria-hidden="true">
          <circle class="sun-halo" cx="250" cy="250" r="190" />
          <path class="sun-rays" d="M250 20V75M250 425V480M20 250H75M425 250H480M87 87l39 39M374 374l39 39M413 87l-39 39M126 374l-39-39" />
          <circle class="sun-disc" cx="250" cy="250" r="137" />
          <circle class="sun-core" cx="250" cy="250" r="111" />
        </svg>
        <svg v-else class="celestial-artwork lunar-artwork" viewBox="0 0 500 500" aria-hidden="true">
          <defs>
            <clipPath id="moon-lit-area">
              <path :d="moonSurfacePath" />
            </clipPath>
          </defs>
          <circle class="moon-shadow" cx="250" cy="250" r="170" />
          <path class="moon-lit" :d="moonSurfacePath" />
          <g class="moon-surface-detail" clip-path="url(#moon-lit-area)">
            <circle cx="210" cy="205" r="32" />
            <circle cx="295" cy="230" r="22" />
            <circle cx="260" cy="305" r="40" />
            <circle cx="185" cy="285" r="16" />
          </g>
          <circle class="moon-outline" cx="250" cy="250" r="169" />
        </svg>
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
        <div class="art-axis"></div>
        <div class="art-marker">E<span>/</span>01</div>
        <div class="art-caption mono">
          <span>{{ celestialLabel }}</span>
          <span>{{ dateLabel }}</span>
        </div>
        <div class="art-stripe"></div>
      </div>
    </div>

    <div class="ticker" aria-label="Areas of focus">
      <div class="ticker-track">
        <span v-for="(item, index) in tickerLoop(props.copy.ticker)" :key="`${index}-${item}`" class="ticker-item mono">
          <span class="ticker-star" aria-hidden="true">✳</span>{{ item }}
        </span>
      </div>
    </div>
  </section>
</template>
