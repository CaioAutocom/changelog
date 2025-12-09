// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@compodium/nuxt',
    'nuxt-auth-utils'
  ],
  ssr: true,
  devtools: {
    enabled: true
  },
  devServer: {
    port: 5173
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/': { prerender: true }
  },
  compatibilityDate: '2025-01-15',
  typescript: {
    typeCheck: true
  },
  sourcemap: true,

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
