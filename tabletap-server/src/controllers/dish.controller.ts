import prisma from '@/database'
import { CreateDishBodyType, UpdateDishBodyType } from '@/schemas/dish.schema'
import { handlePrismaNotFoundError } from '@/utils/errors'

const DISH_ENTITY_NAME = 'Dish'

export const getDishList = async (page: number, limit: number) => {
  const data = await prisma.dish.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit
  })

  const totalItem = await prisma.dish.count()
  const totalPage = Math.ceil(totalItem / limit)

  return { items: data, totalItem, page, limit, totalPage }
}

export const getDishDetail = async (id: string) => {
  try {
    return await prisma.dish.findUniqueOrThrow({
      where: { id }
    })
  } catch (error) {
    handlePrismaNotFoundError(error, DISH_ENTITY_NAME)
  }
}

export const createDish = async (data: CreateDishBodyType) => {
  return await prisma.dish.create({ data })
}

export const updateDish = async (id: string, data: UpdateDishBodyType) => {
  try {
    return await prisma.dish.update({
      where: { id },
      data
    })
  } catch (error) {
    handlePrismaNotFoundError(error, DISH_ENTITY_NAME)
  }
}

export const deleteDish = async (id: string) => {
  try {
    return await prisma.dish.delete({ where: { id } })
  } catch (error) {
    handlePrismaNotFoundError(error, DISH_ENTITY_NAME)
  }
}
