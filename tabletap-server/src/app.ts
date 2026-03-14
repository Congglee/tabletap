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
import autoRemoveRefreshTokenJob from '@/jobs/auth.job'
import appLogger from '@/config/logger'

// Frameworks/Libraries imports
import Fastify from 'fastify'
import path from 'path'

// Routes imports
import healthRoutes from '@/routes/health.route'
import authRoutes from '@/routes/auth.route'
import tablesRoutes from '@/routes/table.route'
import dishRoutes from '@/routes/dish.route'
import mediaRoutes from '@/routes/media.route'
import { createFolder } from '@/utils/commons'
import envConfig from '@/config/environment'
import staticRoutes from '@/routes/static.route'

const buildApp = () => {
  const fastify = Fastify({ logger: false })

  appLogger.info('server', 'Starting backend bootstrap')

  createFolder(path.resolve(envConfig.UPLOAD_FOLDER))
  appLogger.debug('server', `Upload folder ready: ${envConfig.UPLOAD_FOLDER}`)

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
  fastify.register(tablesRoutes, {
    prefix: '/tables'
  })
  fastify.register(dishRoutes, {
    prefix: '/dishes'
  })
  fastify.register(mediaRoutes, {
    prefix: '/media'
  })
  fastify.register(staticRoutes, {
    prefix: '/static'
  })
  fastify.register(healthRoutes, {
    prefix: '/health'
  })

  return fastify
}

export default buildApp
