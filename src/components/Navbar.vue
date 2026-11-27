<script setup lang="ts">
import { getMoonLitPath, useMoonPhase } from '../composables/useMoonPhase'
import type { Language } from '../data/translations'

defineProps<{
  copy: {
    projects: string
    university: string
    highschool: string
    contact: string
    navLabel: string
    themeDark: string
    themeLight: string
    languageLabel: string
    themeLabel: string
  }
  language: Language
  theme: 'dark' | 'light'
}>()

const emit = defineEmits<{
  'change-language': [language: Language]
  'toggle-theme': []
}>()

const { phase: moonPhase } = useMoonPhase()
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="#top" aria-label="Ezra — home">
      <span class="wordmark-mark">
        <img class="wordmark-avatar" src="/image/profile.jpg" alt="" aria-hidden="true" />
      </span>
    </a>

    <nav class="main-nav" :aria-label="copy.navLabel">
      <a href="#projects">{{ copy.projects }}</a>
      <a href="#kuliah">{{ copy.university }}</a>
      <a href="#sma">{{ copy.highschool }}</a>
      <a href="#contact">{{ copy.contact }}</a>
    </nav>

    <div class="header-controls">
      <button
        class="control-button language-control"
        type="button"
        :aria-label="copy.languageLabel"
        @click="emit('change-language', language === 'ID' ? 'EN' : 'ID')"
      >
        <span :class="{ 'is-current': language === 'ID' }">ID</span>
        <span class="control-slash">/</span>
        <span :class="{ 'is-current': language === 'EN' }">EN</span>
      </button>
      <button
        class="control-button theme-control"
        type="button"
        role="switch"
        :aria-checked="theme === 'light'"
        :aria-label="`${copy.themeLabel}: ${theme === 'light' ? copy.themeLight : copy.themeDark}`"
        @click="emit('toggle-theme')"
      >
        <span class="theme-switch-track" aria-hidden="true">
          <span class="theme-switch-endpoint theme-switch-moon">
            <svg viewBox="0 0 24 24">
              <path d="M19.2 15.1A8 8 0 0 1 8.9 4.8 8.5 8.5 0 1 0 19.2 15.1Z" />
            </svg>
          </span>
          <span class="theme-switch-endpoint theme-switch-sun">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </svg>
          </span>
          <span class="theme-switch-thumb" :class="{ 'is-light': theme === 'light' }">
            <Transition name="theme-icon" mode="out-in">
              <span :key="theme" class="celestial-icon">
                <svg v-if="theme === 'light'" class="sun-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                </svg>
                <svg v-else viewBox="0 0 24 24">
                  <circle class="moon-shadow" cx="12" cy="12" r="10" />
                  <path class="moon-lit" :d="getMoonLitPath(moonPhase)" />
                  <circle class="moon-outline" cx="12" cy="12" r="9.5" />
                </svg>
              </span>
            </Transition>
          </span>
        </span>
      </button>
    </div>
  </header>
</template>
