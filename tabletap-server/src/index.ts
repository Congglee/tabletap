import Fastify from 'fastify'
import { config } from 'dotenv'

config({ path: '.env' })

const fastify = Fastify({ logger: false })

const START_SERVER = async () => {
  try {
    await fastify.listen({
      port: Number(process.env.PORT) || 4000,
      host: process.env.DOMAIN || 'localhost'
    })

    console.log(`Server is running on ${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

START_SERVER()
