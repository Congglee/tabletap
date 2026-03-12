import 'fastify'
import { PrismaClient } from '@prisma/client'
import { type TokenPayload } from '@/types/jwt.type'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }

  interface FastifyRequest {
    decodedAccessToken?: TokenPayload
  }
}
