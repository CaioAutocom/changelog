import { defineEventHandler, readBody, createError } from 'h3'
import { criarTokenAcessoRequisicao, criarTokenDeAcessoResposta } from '~/core/schemas/auth/authToken.schema'

export default defineEventHandler(async (event) => {
  // 1. Validar body com seu Zod
  const body = criarTokenAcessoRequisicao.parse(await readBody(event))
  const { email, senha, tenantId } = body

  try {
    // 2. Chamar API real com base no seu contrato
    const respostaApi = await $fetch('https://app.esistem.com.br/api/v1/tokens/token-de-acesso', {
      method: 'POST',
      body: {
        email,
        senha,
        tenantId
      }
    })

    // 3. Validar resposta com seu schema
    const tokens = criarTokenDeAcessoResposta.parse(respostaApi)

    // Agora temos:
    // tokens.tokenDeAcesso
    // tokens.tokenDeAtualizacao
    // tokens.dataHoraTokenDeAtualizacao

    // 4. Criar sessão segura (cookie HttpOnly)
    await setUserSession(event, {
      tokenDeAcesso: tokens.tokenDeAcesso,
      tokenDeAtualizacao: tokens.tokenDeAtualizacao,
      dataHoraTokenDeAtualizacao: tokens.dataHoraTokenDeAtualizacao,
      tenantId
    })

    // 5. Retornar sucesso
    return { ok: true }
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 401,
      message: error?.data?.message || 'Credenciais inválidas.'
    })
  }
})
