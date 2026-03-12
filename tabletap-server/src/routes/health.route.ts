import { requireLoginedHook } from '@/hooks/auth.hook'
import { FastifyInstance } from 'fastify'

export default async function healthRoutes(fastify: FastifyInstance) {
  // Testing fastify auth hook!!!
  fastify.addHook('preValidation', requireLoginedHook)

  fastify.get('/check', async (_, reply) => {
    reply.send({ message: 'Server is healthy and ready to serve requests 🚀' })
  })
}
