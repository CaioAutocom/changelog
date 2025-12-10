<script setup lang="ts">

import type { Tenant, UsuarioLoginResponse } from '~/core/schemas/auth/authLogin.schema'

const router = useRouter()
const toast = useToast()

// Dados do formulário
const credentials = reactive({
  email: '',
  senha: ''
})

// Tenants recebidos no prelogin
const tenants = ref<Tenant[]>([])
const selectedTenant = ref<string>('')

// Controle de estado
const etapa = ref<'login' | 'tenant'>('login')
const loading = ref(false)

// 1️⃣ PRELOGIN → valida credenciais e retorna tenants
async function prelogin() {
  loading.value = true
  try {
    const resposta = await $fetch<UsuarioLoginResponse>('/api/auth/prelogin', {
      method: 'POST',
      body: {
        email: credentials.email,
        senha: credentials.senha
      }
    })

    tenants.value = resposta.tenants
    etapa.value = 'tenant'

    toast.add({
      title: 'Credenciais validadas',
      description: 'Selecione um tenant para continuar',
    })
  } catch (err: any) {
    toast.add({
      title: 'Erro na autenticação',
      description: err?.data?.message || 'Credenciais inválidas',
    })
  } finally {
    loading.value = false
  }
}

// 2️⃣ LOGIN FINAL → gera token e cria sessão HttpOnly
async function loginFinal() {
  if (!selectedTenant.value) {
    toast.add({
      title: 'Tenant não selecionado',
      description: 'Por favor, selecione um tenant',
    })
    return
  }

  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: credentials.email,
        senha: credentials.senha,
        tenantId: selectedTenant.value
      }
    })

    toast.add({
      title: 'Login realizado com sucesso',
      description: 'Redirecionando...',
    })

    // Redireciona para a página inicial
    router.push('/')
  } catch (err: any) {
    toast.add({
      title: 'Erro ao autenticar',
      description: err?.data?.message || 'Erro ao autenticar tenant',
    })
  } finally {
    loading.value = false
  }
}

// Opções para o select de tenants
const tenantsOptions = computed(() =>
  tenants.value.map(t => ({
    label: t.nome,
    value: t.id
  }))
)
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 ">


    <!-- 💠 Etapa 1: Login com email e senha -->
    <UCard v-if="etapa === 'login'" class="w-full max-w-md ">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-lock-keyhole" class="w-6 h-6" />
          <h2 class="text-xl font-semibold">Acessar Sistema</h2>
        </div>
      </template>

      <form @submit.prevent="prelogin" class="space-y-4">

        <UFormGroup label="Email" name="email" required >
          <UInput
          class="w-full mb-2"
            v-model="credentials.email"
            type="email"
            placeholder="seu@email.com"
            icon="i-lucide-mail"
            size="lg"
            :disabled="loading"
          />
        </UFormGroup>

        <UFormGroup label="Senha" name="senha" required>
          <UInput
          class="w-full mb-2"

            v-model="credentials.senha"
            type="password"
            placeholder="••••••••"
            icon="i-lucide-key"
            size="lg"
            :disabled="loading"
          />
        </UFormGroup>

        <UButton
          type="submit"
          block
          size="lg"
          :loading="loading"
          :disabled="loading || !credentials.email || !credentials.senha"
        >
          {{ loading ? 'Validando...' : 'Continuar' }}
        </UButton>
      </form>
    </UCard>

    <!-- 💠 Etapa 2: Seleção de Tenant -->
    <UCard v-else-if="etapa === 'tenant'" class="w-full max-w-md">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-building-2" class="w-6 h-6" />
          <h2 class="text-xl font-semibold">Selecione o Tenant</h2>
        </div>
      </template>

      <form @submit.prevent="loginFinal" class="space-y-4">
        <UFormGroup label="Tenant" name="tenant" required>
          <USelectMenu
           class="w-full mb-2"
            v-model="selectedTenant"
            :options="tenantsOptions"
            placeholder="Escolha um tenant..."
            size="lg"
            :disabled="loading"
          />
        </UFormGroup>

        <div class="flex gap-2">

          <UButton
            type="submit"
            block
            size="lg"
            :loading="loading"
            :disabled="loading || !selectedTenant"
          >
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </UButton>

          <UButton
            type="button"
            variant="ghost"
            block
            size="lg"
            :disabled="loading"
            @click="etapa = 'login'"
          >
            Voltar
          </UButton>

        </div>
      </form>
    </UCard>
  </div>
</template>
