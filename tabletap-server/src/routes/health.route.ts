import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function healthRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/check', async (_, reply) => {
    reply.send({ message: 'Server is healthy and ready to serve requests 🚀' })
  })
}
