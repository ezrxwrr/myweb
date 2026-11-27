<script setup lang="ts">
import { ref } from 'vue'
import type { TranslationCopy } from '../data/translations'

defineProps<{
  copy: TranslationCopy['footer']
}>()

const email = 'ezraherguetta@gmail.com'
const copyStatus = ref<'idle' | 'copied' | 'failed'>('idle')

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email)
    copyStatus.value = 'copied'
    window.setTimeout(() => { copyStatus.value = 'idle' }, 1800)
  } catch (error) {
    console.error('Could not copy email address to clipboard.', error)
    copyStatus.value = 'failed'
  }
}
</script>

<template>
  <footer id="contact" class="footer-section page-gutter">
    <div class="section-index mono" data-reveal>{{ copy.index }}</div>
    <div class="footer-content" data-reveal>
      <h2 class="display-heading footer-heading" v-html="copy.heading"></h2>
      <p>{{ copy.intro }}</p>
      <div class="footer-contact-row">
        <div>
          <span class="stack-label mono">{{ copy.email }}</span>
          <a class="email-link" :href="`mailto:${email}`">{{ email }}</a>
        </div>
        <button class="button button-primary copy-button" type="button" @click="copyEmail">
          {{ copyStatus === 'copied' ? copy.copied : copyStatus === 'failed' ? copy.copyFailed : copy.copyEmail }}
          <span aria-hidden="true">{{ copyStatus === 'copied' ? '✓' : '↗' }}</span>
        </button>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="mono">{{ copy.rights }} © 2026 EZRA</span>
      <div class="footer-links mono">
        <a class="social-link" href="https://github.com/ezrxwrr" target="_blank" rel="noreferrer">
          <span class="social-link-index">01</span>
          <span class="social-link-name">{{ copy.github }}</span>
          <span class="social-link-handle">github.com/ezrxwrr</span>
          <span class="social-link-arrow" aria-hidden="true">↗</span>
        </a>
        <a class="social-link" href="https://www.instagram.com/zrxwrr/" target="_blank" rel="noreferrer">
          <span class="social-link-index">02</span>
          <span class="social-link-name">{{ copy.instagram }}</span>
          <span class="social-link-handle">@zrxwrr</span>
          <span class="social-link-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </footer>
</template>
