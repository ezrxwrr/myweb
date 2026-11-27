<script setup lang="ts">
import { featuredProjects, localized, type GalleryImage } from '../data/portfolio'
import type { Language, TranslationCopy } from '../data/translations'

defineProps<{
  copy: TranslationCopy['projects']
  language: Language
}>()

const emit = defineEmits<{
  'open-gallery': [images: GalleryImage[], index?: number]
}>()
</script>

<template>
  <section id="projects" class="content-section page-gutter">
    <div class="section-heading" data-reveal>
      <div class="section-index mono">{{ copy.index }}</div>
      <div class="section-intro">
        <h2 class="display-heading section-title" v-html="copy.heading"></h2>
        <p>{{ copy.intro }}</p>
      </div>
      <div class="section-count mono"><span>03</span> {{ copy.items }}</div>
    </div>

    <div class="project-list">
      <article v-for="(project, index) in featuredProjects" :key="project.id" class="project-row" data-reveal>
        <div class="project-number mono">0{{ index + 1 }}</div>
        <button
          class="project-image image-frame"
          type="button"
          :aria-label="`${copy.openPreview}: ${localized(project.title, language)}`"
          @click="emit('open-gallery', project.galleryImages ?? [{ src: project.imageSrc, alt: project.title }])"
        >
          <img :src="project.imageSrc" :alt="localized(project.title, language)" loading="lazy" />
          <span class="image-open mono">{{ copy.openPreview }} ↗</span>
        </button>
        <div class="project-details">
          <div class="project-kicker mono">{{ localized(project.roleOrCategory, language) }} <span>· {{ project.year }}</span></div>
          <h3>{{ localized(project.title, language) }}</h3>
          <div class="project-copy-grid">
            <div class="project-problem">
              <span class="stack-label mono">{{ copy.problemLabel }}</span>
              <p class="project-description">{{ localized(project.description, language) }}</p>
            </div>
            <div class="project-stack">
              <span class="stack-label mono">{{ copy.stackLabel }}</span>
              <ul class="tag-list">
                <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
              </ul>
            </div>
          </div>
          <a class="text-link mono" :href="project.externalUrl" target="_blank" rel="noreferrer">
            {{ copy.repo }} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
