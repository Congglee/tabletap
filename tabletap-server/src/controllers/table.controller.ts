import prisma from '@/database'
import { UpdateTableBodyType, type CreateTableBodyType } from '@/schemas/table.schema'
import { randomId } from '@/utils/commons'
import { EntityError, handlePrismaNotFoundError, isPrismaClientKnownRequestError } from '@/utils/errors'

const TABLE_ENTITY_NAME = 'RestaurantTable'

export const getTableList = async (page: number, limit: number) => {
  const data = await prisma.restaurantTable.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit
  })

  const totalItem = await prisma.restaurantTable.count()
  const totalPage = Math.ceil(totalItem / limit)

  return { items: data, totalItem, page, limit, totalPage }
}

export const getTableDetail = async (number: number) => {
  try {
    return await prisma.restaurantTable.findUniqueOrThrow({
      where: { number }
    })
  } catch (error) {
    handlePrismaNotFoundError(error, TABLE_ENTITY_NAME)
  }
}

export const createTable = async (body: CreateTableBodyType) => {
  const token = randomId()

  try {
    const result = await prisma.restaurantTable.create({
      data: { ...body, token }
    })
    return result
  } catch (error) {
    if (isPrismaClientKnownRequestError(error) && error.code === 'P2002') {
      throw new EntityError([
        {
          message: 'Table number already exists',
          field: 'number'
        }
      ])
    }
    throw error
  }
}

export const updateTable = async (number: number, body: UpdateTableBodyType) => {
  if (body.changeToken) {
    const token = randomId()

    // Delete all refresh tokens of guests for the table
    try {
      return await prisma.$transaction(async (tx) => {
        const [table] = await Promise.all([
          tx.restaurantTable.update({
            where: { number },
            data: {
              status: body.status,
              capacity: body.capacity,
              token
            }
          }),

          tx.guest.updateMany({
            where: { tableNumber: number },
            data: {
              refreshToken: null,
              refreshTokenExpiresAt: null
            }
          })
        ])
        return table
      })
    } catch (error) {
      handlePrismaNotFoundError(error, TABLE_ENTITY_NAME)
    }
  }

  try {
    return await prisma.restaurantTable.update({
      where: { number },
      data: {
        status: body.status,
        capacity: body.capacity
      }
    })
  } catch (error) {
    handlePrismaNotFoundError(error, TABLE_ENTITY_NAME)
  }
}

export const deleteTable = async (number: number) => {
  try {
    return await prisma.restaurantTable.delete({
      where: { number }
    })
  } catch (error) {
    handlePrismaNotFoundError(error, TABLE_ENTITY_NAME)
  }
}
