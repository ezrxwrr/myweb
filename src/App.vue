<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import type { PartialOptions } from 'overlayscrollbars'
import EraSection from './components/EraSection.vue'
import FooterSection from './components/FooterSection.vue'
import HeroSection from './components/HeroSection.vue'
import ImageModal from './components/ImageModal.vue'
import Navbar from './components/Navbar.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import { translations, type Language } from './data/translations'
import { type GalleryImage } from './data/portfolio'

type Theme = 'dark' | 'light'
type ThemeViewTransition = { finished: Promise<void> }
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => ThemeViewTransition
}

const theme = ref<Theme>((localStorage.getItem('portfolio-theme') as Theme) || 'dark')
const language = ref<Language>((localStorage.getItem('portfolio-language') as Language) || 'EN')
const copy = computed(() => translations[language.value])
const activeGallery = ref<GalleryImage[] | null>(null)
const activeImageIndex = ref(0)
let revealObserver: IntersectionObserver | undefined
let revealRootObserver: MutationObserver | undefined
let viewTransitionSequence = 0
let revealScrollRoot: HTMLElement | null = null
let previousScrollTop = 0
let scrollDirection: 'up' | 'down' = 'down'

const scrollOptions: PartialOptions = {
  overflow: { x: 'hidden', y: 'scroll' },
  scrollbars: {
    theme: 'os-theme-portfolio',
    autoHide: 'leave',
    autoHideDelay: 450,
    autoHideSuspend: false,
    dragScroll: true,
    clickScroll: true,
  },
}

watch(theme, (value) => {
  document.documentElement.dataset.theme = value
  localStorage.setItem('portfolio-theme', value)
}, { immediate: true })

watch(language, (value) => {
  document.documentElement.lang = value === 'ID' ? 'id' : 'en'
  localStorage.setItem('portfolio-language', value)
}, { immediate: true })

function openGallery(images: GalleryImage[], index = 0) {
  activeGallery.value = images
  activeImageIndex.value = index
}

function closeGallery() {
  activeGallery.value = null
}

function canUseViewTransitions() {
  const transitionDocument = document as ViewTransitionDocument
  return Boolean(transitionDocument.startViewTransition)
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function startVisualTransition(
  transitionClass: 'theme-view-transition' | 'language-view-transition',
  update: () => void,
) {
  const transitionDocument = document as ViewTransitionDocument
  if (!transitionDocument.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    update()
    return
  }

  const root = document.documentElement
  root.classList.remove('theme-view-transition', 'language-view-transition')
  if (transitionClass !== 'theme-view-transition') {
    root.style.removeProperty('--theme-wipe-x')
    root.style.removeProperty('--theme-wipe-y')
    root.style.removeProperty('--theme-wipe-radius')
  }
  root.classList.add(transitionClass)

  const transitionId = ++viewTransitionSequence
  const transition = transitionDocument.startViewTransition(async () => {
    update()
    await nextTick()
  })

  const clearTransitionState = () => {
    if (transitionId !== viewTransitionSequence) return

    root.classList.remove('theme-view-transition', 'language-view-transition')
    root.style.removeProperty('--theme-wipe-x')
    root.style.removeProperty('--theme-wipe-y')
    root.style.removeProperty('--theme-wipe-radius')
  }

  void transition.finished.then(clearTransitionState, clearTransitionState)
}

function changeLanguage(nextLanguage: Language) {
  if (nextLanguage === language.value) return

  if (!canUseViewTransitions()) {
    language.value = nextLanguage
    return
  }

  startVisualTransition('language-view-transition', () => {
    language.value = nextLanguage
  })
}

function toggleTheme() {
  const nextTheme: Theme = theme.value === 'dark' ? 'light' : 'dark'
  if (!canUseViewTransitions()) {
    theme.value = nextTheme
    return
  }

  const root = document.documentElement

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const celestial = document.querySelector<SVGGraphicsElement>('.hero-art .sun-disc, .hero-art .moon-shadow')
  const celestialBounds = celestial?.getBoundingClientRect()
  const celestialVisible = celestialBounds
    && celestialBounds.right > 0
    && celestialBounds.left < viewportWidth
    && celestialBounds.bottom > 0
    && celestialBounds.top < viewportHeight
  const fallbackBounds = document.querySelector('.theme-switch-thumb')?.getBoundingClientRect()
  const originX = celestialVisible
    ? celestialBounds.left + celestialBounds.width / 2
    : fallbackBounds
      ? fallbackBounds.left + fallbackBounds.width / 2
      : viewportWidth / 2
  const originY = celestialVisible
    ? celestialBounds.top + celestialBounds.height / 2
    : fallbackBounds
      ? fallbackBounds.top + fallbackBounds.height / 2
      : viewportHeight / 2
  const radius = Math.ceil(Math.hypot(
    Math.max(originX, viewportWidth - originX),
    Math.max(originY, viewportHeight - originY),
  )) + 2

  root.style.setProperty('--theme-wipe-x', `${originX}px`)
  root.style.setProperty('--theme-wipe-y', `${originY}px`)
  root.style.setProperty('--theme-wipe-radius', `${radius}px`)

  startVisualTransition('theme-view-transition', () => {
    theme.value = nextTheme
  })
}

function updateScrollDirection() {
  if (!revealScrollRoot) return

  const currentScrollTop = revealScrollRoot.scrollTop
  if (currentScrollTop !== previousScrollTop) {
    scrollDirection = currentScrollTop > previousScrollTop ? 'down' : 'up'
    previousScrollTop = currentScrollTop
  }
}

function setupRevealObserver(): boolean {
  revealScrollRoot = document.querySelector<HTMLElement>('[data-overlayscrollbars-viewport]')
  if (!revealScrollRoot) return false

  previousScrollTop = revealScrollRoot.scrollTop
  revealScrollRoot.addEventListener('scroll', updateScrollDirection, { passive: true })
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.setAttribute('data-reveal-direction', scrollDirection)

      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      } else {
        entry.target.classList.remove('is-visible')
      }
    })
  }, { root: revealScrollRoot, rootMargin: '40px 0px', threshold: 0.08 })

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
    revealObserver?.observe(element)
  })

  return true
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion')
    return
  }

  document.documentElement.classList.add('motion-ready')
  if (!setupRevealObserver()) {
    revealRootObserver = new MutationObserver(() => {
      if (setupRevealObserver()) {
        revealRootObserver?.disconnect()
        revealRootObserver = undefined
      }
    })
    revealRootObserver.observe(document.body, { childList: true, subtree: true })
  }
})

onUnmounted(() => {
  revealObserver?.disconnect()
  revealRootObserver?.disconnect()
  revealScrollRoot?.removeEventListener('scroll', updateScrollDirection)
})
</script>

<template>
  <OverlayScrollbarsComponent class="portfolio-scroll" :options="scrollOptions" defer>
    <Navbar
      :copy="copy.nav"
      :language="language"
      :theme="theme"
      @change-language="changeLanguage"
      @toggle-theme="toggleTheme"
    />

    <main>
      <HeroSection :copy="copy.hero" :language="language" :theme="theme" />
      <ProjectsSection :copy="copy.projects" :language="language" @open-gallery="openGallery" />
      <EraSection
        era="university"
        :copy="copy.university"
        :language="language"
        @open-gallery="openGallery"
      />
      <EraSection
        era="highschool"
        :copy="copy.highschool"
        :language="language"
        @open-gallery="openGallery"
      />
    </main>

    <FooterSection :copy="copy.footer" />
    <ImageModal
      v-if="activeGallery"
      :images="activeGallery"
      :active-index="activeImageIndex"
      :language="language"
      :copy="copy.modal"
      @close="closeGallery"
      @change="activeImageIndex = $event"
    />
  </OverlayScrollbarsComponent>
</template>
