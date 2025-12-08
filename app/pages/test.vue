<template>
   <div>
    <div v-if="isLoading">Carregando...</div>
    <div v-else-if="error">Erro!</div>

    <pre v-else>{{ data }}</pre>
  </div>

</template>
<script setup lang="ts">
import { useUsersExample } from '~/composables/useUsersExample'

const { data, error, isLoading } = useUsersExample()
</script>
