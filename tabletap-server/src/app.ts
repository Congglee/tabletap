// Plugins imports
import prismaPlugin from '@/plugins/prisma.plugin'

// Config imports
import { corsOptions } from '@/config/cors'

// Frameworks/Libraries imports
import Fastify from 'fastify'
import cors from '@fastify/cors'

// Routes imports
import healthRoutes from '@/routes/health.route'

const buildApp = () => {
  const fastify = Fastify({ logger: false })

  fastify.register(cors, corsOptions)
  fastify.register(prismaPlugin)

  fastify.register(healthRoutes, {
    prefix: '/health'
  })

  return fastify
}

export default buildApp
