// Plugins imports
import prismaPlugin from '@/plugins/prisma.plugin'
import validatorCompilerPlugin from '@/plugins/validator-compiler.plugin'
import errorHandlerPlugin from '@/plugins/error-handler.plugin'
import cors from '@fastify/cors'
import fastifyAuth from '@fastify/auth'
import fastifyHelmet from '@fastify/helmet'
import fastifyCookie from '@fastify/cookie'

// Config imports
import { corsOptions } from '@/config/cors'

// Frameworks/Libraries imports
import Fastify from 'fastify'

// Routes imports
import healthRoutes from '@/routes/health.route'
import authRoutes from '@/routes/auth.route'
import appLogger from '@/config/logger'
import autoRemoveRefreshTokenJob from '@/jobs/auth.job'

const buildApp = () => {
  const fastify = Fastify({ logger: false })

  appLogger.info('server', 'Starting backend bootstrap')

  autoRemoveRefreshTokenJob()
  appLogger.info('server', 'Refresh token cleanup job started')

  fastify.register(cors, corsOptions)
  fastify.register(fastifyAuth, { defaultRelation: 'and' })
  fastify.register(fastifyHelmet, {
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
  fastify.register(fastifyCookie)
  fastify.register(validatorCompilerPlugin)
  fastify.register(errorHandlerPlugin)
  fastify.register(prismaPlugin)

  fastify.register(authRoutes, {
    prefix: '/auth'
  })
  fastify.register(healthRoutes, {
    prefix: '/health'
  })

  return fastify
}

export default buildApp
