import { Prisma } from '@prisma/client'

const NOT_FOUND_STATUS = 404

export class EntityError extends Error {
  fields: { message: string; field: string }[]
  status: number = 422
  constructor(fields: { message: string; field: string }[]) {
    super('Data validation error')
    this.fields = fields
  }
}

export class AuthError extends Error {
  status: number = 401
  constructor(message: string) {
    super(message)
  }
}

export class ForbiddenError extends Error {
  status: number = 403
  constructor(message: string) {
    super(message)
  }
}

export class StatusError extends Error {
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    super(message)
    this.status = status
  }
}

export const isPrismaClientKnownRequestError = (error: unknown): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError
}

export const getNotFoundMessage = (entityName: string) => {
  return `No ${entityName} found`
}

export const throwNotFoundError = (entityName: string): never => {
  throw new StatusError({
    message: getNotFoundMessage(entityName),
    status: NOT_FOUND_STATUS
  })
}

export const handlePrismaNotFoundError = (error: unknown, entityName: string): never => {
  if (isPrismaClientKnownRequestError(error) && error.code === 'P2025') {
    throwNotFoundError(entityName)
  }

  throw error
}
