import Fastify from 'fastify'
import prismaPlugin from '@/plugins/prisma.plugin'

const buildApp = () => {
  const fastify = Fastify({ logger: false })

  fastify.register(prismaPlugin)

  return fastify
}

export default buildApp
