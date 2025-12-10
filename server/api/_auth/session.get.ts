export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  return {
    userId: session.userId,
    nome: session.nome,
    administrador: session.administrador,
    tenantId: session.tenantId,
  }
})
