// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const rotasPublicas = ['/login', '/page']

  if (rotasPublicas.includes(to.path)) {
    return
  }

  const { loggedIn } = useUserSession()

  // loggedIn é um ref<boolean>
  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})
