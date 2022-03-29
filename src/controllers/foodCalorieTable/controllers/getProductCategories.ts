import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { ProductCategories } from '../../../db/entities/ProductCategories'

export const getProductCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ProductCategoriesList = await dataSource.getRepository(ProductCategories)
      .createQueryBuilder('categories')
      .orderBy({'id': 'ASC'})
      .getMany()

    const response = {
      data: ProductCategoriesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
