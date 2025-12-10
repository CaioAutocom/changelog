import { defineEventHandler, readBody, createError } from 'h3'
import { criarTokenAcessoRequisicao, criarTokenDeAcessoResposta } from '~/core/schemas/auth/authToken.schema'

export default defineEventHandler(async (event) => {
  const body = criarTokenAcessoRequisicao.parse(await readBody(event))
  const { email, senha, tenantId } = body

  try {
    const respostaApi = await $fetch('https://app.esistem.com.br/api/v1/tokens/token-de-acesso', {
      method: 'POST',
      body: {
        email,
        senha,
        tenantId
      }
    })

    const tokens = criarTokenDeAcessoResposta.parse(respostaApi)

    setCookie(event, 'access_token', tokens.tokenDeAcesso, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 // 1h
    })

    setCookie(event, 'refresh_token', tokens.tokenDeAtualizacao, { httpOnly: true, secure: true })

    // Criar sessão segura (cookie HttpOnly)
    await setUserSession(event, {
      loggedIn: true,
      tenantId
    })

    return { ok: true }
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 401,
      message: error?.data?.message || 'Credenciais inválidas.'
    })
  }
})
