<script setup lang="ts">
const versions = ref([
  {
    title: 'Versão 3.17',
    description: 'Adiciona módulo de produtos e melhorias na performance geral do sistema.',
    date: '2025-04-27',
    to: 'https://nuxt.com/blog/v3-17',
    target: '_blank',
    ui: {
      container: 'max-w-lg'
    }
  },
  {
    title: 'Versão 3.16',
    description: 'Adiciona melhorias na interface do usuário e correções de bugs.',
    date: '2025-03-07',
    to: 'https://nuxt.com/blog/v3-16',
    target: '_blank',
    ui: {
      container: 'max-w-lg'
    }
  },
  {
    title: 'Versão 3.15',
    description: 'Adiciona melhorias na interface do usuário e correções de bugs.',
    date: '2024-12-24',
    to: 'https://nuxt.com/blog/v3-15',
    target: '_blank',
    ui: {
      container: 'max-w-lg'
    }
  }
])
</script>

<template>
  <UChangelogVersions
    :versions="versions"
    class="mx-auto max-w-4xl"
  />
</template>
