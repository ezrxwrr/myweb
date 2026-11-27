import { onMounted, onUnmounted, ref } from 'vue'

const SYNODIC_MONTH_MS = 29.530588853 * 24 * 60 * 60 * 1000
const KNOWN_NEW_MOON_UTC = Date.UTC(2000, 0, 6, 18, 14)

function getMoonPhase(date: Date) {
  const localNoon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12).getTime()
  const elapsed = ((localNoon - KNOWN_NEW_MOON_UTC) % SYNODIC_MONTH_MS + SYNODIC_MONTH_MS) % SYNODIC_MONTH_MS
  return elapsed / SYNODIC_MONTH_MS
}

export function getMoonLitPath(phase: number, center = 12, radius = 10) {
  const normalizedPhase = ((phase % 1) + 1) % 1
  const terminatorRadius = Math.abs(Math.cos(normalizedPhase * Math.PI * 2)) * radius
  const waxing = normalizedPhase < 0.5
  const outerSweep = waxing ? 1 : 0
  const innerSweep = waxing
    ? normalizedPhase < 0.25 ? 0 : 1
    : normalizedPhase < 0.75 ? 0 : 1

  return `M ${center} ${center - radius} A ${radius} ${radius} 0 0 ${outerSweep} ${center} ${center + radius} A ${terminatorRadius.toFixed(3)} ${radius} 0 0 ${innerSweep} ${center} ${center - radius} Z`
}

export function getMoonPhaseIndex(phase: number) {
  return Math.round(phase * 8) % 8
}

export function useMoonPhase() {
  const date = ref(new Date())
  const phase = ref(getMoonPhase(date.value))
  let midnightTimer: number | undefined

  function scheduleRefresh() {
    const now = new Date()
    const nextLocalMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    midnightTimer = window.setTimeout(() => {
      date.value = new Date()
      phase.value = getMoonPhase(date.value)
      scheduleRefresh()
    }, nextLocalMidnight.getTime() - now.getTime() + 50)
  }

  onMounted(scheduleRefresh)
  onUnmounted(() => {
    if (midnightTimer !== undefined) window.clearTimeout(midnightTimer)
  })

  return { date, phase }
}
