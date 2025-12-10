<script setup lang="ts">
const links = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Formulário',
    icon: 'i-lucide-file-text',
    to: '/formulario'
  },
  {
    label: 'Grid',
    icon: 'i-lucide-table',
    to: '/grid'
  },
  {
    label: 'Changelog',
    icon: 'i-lucide-git-commit',
    to: '/changelog'
  }
]

const user = ref({
  name: 'Usuário',
  email: 'usuario@exemplo.com',
  avatar: 'https://avatar.vercel.sh/user'
})

async function handleLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await navigateTo('/login')
}
</script>

<template>
  <UPage>
    <template #left>
      <UAside>
        <div class="p-4 border-b border-gray-200 dark:border-gray-800">
          <div class="flex items-center gap-3">
            <UAvatar :src="user.avatar" :alt="user.name" size="md" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate">{{ user.name }}</p>
              <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <UNavigationTree :links="links" default-open :multiple="false" />

        <template #footer>
          <div class="p-4 border-t border-gray-200 dark:border-gray-800">
            <UButton
              icon="i-lucide-log-out"
              variant="ghost"
              block
              @click="handleLogout"
            >
              Sair
            </UButton>
          </div>
        </template>
      </UAside>
    </template>

    <template #right>
      <UAside>
        <UNavigationTree
          :links="[
            {
              label: 'Informações',
              children: [
                { label: 'Sobre', icon: 'i-lucide-info' },
                { label: 'Ajuda', icon: 'i-lucide-help-circle' },
                { label: 'Documentação', icon: 'i-lucide-book-open' }
              ]
            },
            {
              label: 'Configurações',
              children: [
                { label: 'Perfil', icon: 'i-lucide-user' },
                { label: 'Preferências', icon: 'i-lucide-settings' },
                { label: 'Notificações', icon: 'i-lucide-bell' }
              ]
            }
          ]"
        />
      </UAside>
    </template>

    <UPageHeader
      title="Exemplo de Página"
      description="Demonstração de UPage com sidebars left e right"
    >
      <template #links>
        <UButton icon="i-lucide-plus" label="Nova Ação" />
        <UButton icon="i-lucide-refresh-cw"  variant="ghost" />
      </template>
    </UPageHeader>

    <UPageBody>
      <UPageSection>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-users" class="w-5 h-5" />
                <h3 class="font-semibold">Usuários</h3>
              </div>
            </template>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Total de usuários ativos no sistema
            </p>
            <div class="mt-4">
              <p class="text-3xl font-bold">1,234</p>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-activity" class="w-5 h-5" />
                <h3 class="font-semibold">Atividades</h3>
              </div>
            </template>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Ações realizadas hoje
            </p>
            <div class="mt-4">
              <p class="text-3xl font-bold">567</p>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-trending-up" class="w-5 h-5" />
                <h3 class="font-semibold">Crescimento</h3>
              </div>
            </template>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Crescimento mensal
            </p>
            <div class="mt-4">
              <p class="text-3xl font-bold">+12%</p>
            </div>
          </UCard>
        </div>
      </UPageSection>

      <UPageSection
        title="Conteúdo Principal"
        description="Área principal de conteúdo da página"
      >
        <UCard>
          <p class="text-gray-700 dark:text-gray-300">
            Este é um exemplo de página usando os componentes UPage do Nuxt UI.
            A estrutura inclui:
          </p>
          <ul class="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 mt-0.5 text-green-500" />
              <span>Sidebar esquerda com navegação e informações do usuário</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 mt-0.5 text-green-500" />
              <span>Sidebar direita com links adicionais e configurações</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 mt-0.5 text-green-500" />
              <span>Header com título, descrição e ações</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 mt-0.5 text-green-500" />
              <span>Body com seções organizadas e responsivas</span>
            </li>
          </ul>
        </UCard>
      </UPageSection>
    </UPageBody>
  </UPage>
</template>
