<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Tenant, UsuarioLoginResponse } from '~/core/schemas/auth/authLogin.schema'
const router = useRouter()

const { fetch: refreshSession } = useUserSession()

// Dados do formulário
const credentials = reactive({
  email: '',
  senha: ''
})

// Tenants recebidos no prelogin
const tenants = ref<Tenant[]>([])
const selectedTenant =  ref<string | null>(null)

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

    console.log('Resposta do prelogin:', resposta)

    // resposta.tenants deve vir do seu schema
    tenants.value = resposta.tenants
    etapa.value = 'tenant'
  } catch (err) {
    console.log('Erro no prelogin:', err)
    alert('Credenciais inválidas.')
  } finally {
    loading.value = false
  }
}

// 2️⃣ LOGIN FINAL → gera token e cria sessão HttpOnly
async function loginFinal() {
  if (!selectedTenant.value) {
    alert('Selecione um tenant')
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

    // Atualiza sessão no client
    await refreshSession()

    // Redireciona
    router.push('/')
  } catch (err) {
    alert('Erro ao autenticar tenant.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 border rounded">

    <!-- 💠 Etapa 1: Login com email e senha -->
    <form v-if="etapa === 'login'" @submit.prevent="prelogin" class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold mb-2">Acessar Sistema</h2>

      <input
        v-model="credentials.email"
        type="email"
        placeholder="Email"
        class="border px-3 py-2 rounded"
      />

      <input
        v-model="credentials.senha"
        type="password"
        placeholder="Senha"
        class="border px-3 py-2 rounded"
      />

      <button :disabled="loading" type="submit" class="bg-blue-600 text-white py-2 rounded">
        {{ loading ? 'Validando...' : 'Continuar' }}
      </button>
    </form>

    <!-- 💠 Etapa 2: Seleção de Tenant -->
    <form v-else-if="etapa === 'tenant'" @submit.prevent="loginFinal" class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold mb-2">Selecione o Tenant</h2>

      <select
        v-model="selectedTenant"
        class="border px-3 py-2 rounded"
      >
        <option disabled value="">Escolha um tenant...</option>
        <option v-for="t in tenants" :key="t.id" :value="t.id">
          {{ t.nome }}
        </option>
      </select>

      <button :disabled="loading" type="submit" class="bg-green-600 text-white py-2 rounded">
        {{ loading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>

  </div>
</template>
