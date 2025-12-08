export default defineNuxtPlugin(() => {
  globalThis.$fetch = $fetch.create({
    onRequest({ request, options }) {
      // 1. Interceptor de Requisição (Request)
      // Adicionar headers, por exemplo, o token de autenticação:
      const token = useCookie('auth_token').value;
      if (token) {
        options.headers = new Headers({
          ...options.headers,
          Authorization: `Bearer ${token}`,
        });
      }
      console.log('[Fetch Hook] Requesting:', request, options);
    },

    onResponse({ request, response }) {
      // 2. Interceptor de Resposta (Response)
      console.log('[Fetch Hook] Response Status:', response.status);

      // Exemplo de manipulação de erro global (ex: deslogar se for 401)
      if (response.status === 401) {
        // Redirecionar para login ou limpar o token
        console.error('Unauthorized! Redirecting...');
      }
    },

    onRequestError({ error }) {
      // 3. Interceptor de Erro na Requisição
      console.error('[Fetch Hook] Request Error:', error);
    },

    onResponseError({ response }) {
      // 4. Interceptor de Erro na Resposta (códigos 4xx/5xx)
      console.error('[Fetch Hook] Response Error Status:', response.status);
    },
  });
});
