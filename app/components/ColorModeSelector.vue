<script setup lang="ts">
const colorMode = useColorMode()

const colors = [
  { name: 'Black', value: 'black', class: 'bg-gray-950' },
  { name: 'Red', value: 'red', class: 'bg-red-500' },
  { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
  { name: 'Amber', value: 'amber', class: 'bg-amber-500' },
  { name: 'Yellow', value: 'yellow', class: 'bg-yellow-500' },
  { name: 'Lime', value: 'lime', class: 'bg-lime-500' },
  { name: 'Green', value: 'green', class: 'bg-green-500' },
  { name: 'Emerald', value: 'emerald', class: 'bg-emerald-500' },
  { name: 'Teal', value: 'teal', class: 'bg-teal-500' },
  { name: 'Cyan', value: 'cyan', class: 'bg-cyan-500' },
  { name: 'Sky', value: 'sky', class: 'bg-sky-500' },
  { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
  { name: 'Indigo', value: 'indigo', class: 'bg-indigo-500' },
  { name: 'Violet', value: 'violet', class: 'bg-violet-500' },
  { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
  { name: 'Fuchsia', value: 'fuchsia', class: 'bg-fuchsia-500' },
  { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
  { name: 'Rose', value: 'rose', class: 'bg-rose-500' }
]

const neutralColors = [
  { name: 'Slate', value: 'slate', class: 'bg-slate-500' },
  { name: 'Gray', value: 'gray', class: 'bg-gray-500' },
  { name: 'Zinc', value: 'zinc', class: 'bg-zinc-500' },
  { name: 'Neutral', value: 'neutral', class: 'bg-neutral-500' },
  { name: 'Stone', value: 'stone', class: 'bg-stone-500' }
]

const radiusOptions = [
  { label: '0', value: '0' },
  { label: '0.125', value: '0.125' },
  { label: '0.25', value: '0.25' },
  { label: '0.375', value: '0.375' },
  { label: '0.5', value: '0.5' }
]

const appConfig = useAppConfig()

const selectedPrimary = ref(appConfig.ui.colors.primary)
const selectedNeutral = ref(appConfig.ui.colors.neutral)
const selectedRadius = ref(String(appConfig.ui.radius || '0.5'))

watch(selectedPrimary, (value) => {
  appConfig.ui.colors.primary = value
})

watch(selectedNeutral, (value) => {
  appConfig.ui.colors.neutral = value
})

watch(selectedRadius, (value) => {
  appConfig.ui.radius = parseFloat(value)
  // Aplica o radius como CSS variable
  document.documentElement.style.setProperty('--radius', `${value}rem`)
})

// Aplica o radius inicial
onMounted(() => {
  document.documentElement.style.setProperty('--radius', `${selectedRadius.value}rem`)
})
</script>

<template>
  <UPopover>
    <UButton icon="i-lucide-palette" color="neutral" variant="ghost" aria-label="Configurações de tema" />

    <template #content>
      <div class="p-4 w-80">
        <!-- Primary Colors -->
        <div class="mb-6">
          <h3 class="text-sm font-semibold mb-3">Primary</h3>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="color in colors"
              :key="color.value"
              @click="selectedPrimary = color.value"
              class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              :class="{ 'ring-2 ring-offset-2 ring-primary': selectedPrimary === color.value }"
            >
              <div :class="[color.class, 'w-4 h-4 rounded-full']" />
              <span class="text-xs">{{ color.name }}</span>
            </button>
          </div>
        </div>

        <!-- Neutral Colors -->
        <div class="mb-6">
          <h3 class="text-sm font-semibold mb-3">Neutral</h3>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="color in neutralColors"
              :key="color.value"
              @click="selectedNeutral = color.value"
              class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              :class="{ 'ring-2 ring-offset-2 ring-primary': selectedNeutral === color.value }"
            >
              <div :class="[color.class, 'w-4 h-4 rounded-full']" />
              <span class="text-xs">{{ color.name }}</span>
            </button>
          </div>
        </div>

        <!-- Radius -->
        <div class="mb-6">
          <h3 class="text-sm font-semibold mb-3">Radius</h3>
          <div class="flex gap-2">
            <button
              v-for="radius in radiusOptions"
              :key="radius.value"
              @click="selectedRadius = radius.value"
              class="flex-1 px-3 py-2 text-xs rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              :class="{ 'ring-2 ring-offset-2 ring-primary': selectedRadius === radius.value }"
            >
              {{ radius.label }}
            </button>
          </div>
        </div>

        <!-- Theme Mode -->
        <div>
          <h3 class="text-sm font-semibold mb-3">Theme</h3>
          <div class="flex gap-2">
            <UButton
              icon="i-lucide-sun"
              color="neutral"
              variant="outline"
              block
              @click="colorMode.preference = 'light'"
              :class="{ 'ring-2 ring-offset-2 ring-primary': colorMode.preference === 'light' }"
            >
              Light
            </UButton>
            <UButton
              icon="i-lucide-moon"
              color="neutral"
              variant="outline"
              block
              @click="colorMode.preference = 'dark'"
              :class="{ 'ring-2 ring-offset-2 ring-primary': colorMode.preference === 'dark' }"
            >
              Dark
            </UButton>
            <UButton
              icon="i-lucide-monitor"
              color="neutral"
              variant="outline"
              block
              @click="colorMode.preference = 'system'"
              :class="{ 'ring-2 ring-offset-2 ring-primary': colorMode.preference === 'system' }"
            >
              System
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>
