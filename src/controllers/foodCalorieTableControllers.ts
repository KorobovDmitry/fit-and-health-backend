import { Request, Response } from "express"
import { getManager } from "typeorm"
import { Products } from "../db/entities/Products"
import { FavoriteProducts } from '../db/entities/FavoriteProducts'
import { PinnedProducts } from '../db/entities/PinnedProducts'

const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ProductsList = await getManager().find(
      Products,
      {
        where: [
          { user: req.body.userId },
          { user: null }
        ],
        relations: ['user', 'category']
      }
    )

    const UserFavoriteProducts = await getManager().find(
      FavoriteProducts,
      {
        where: {
          userId: req.body.userId
        },
      }
    )
    // console.log(UserFavoriteProducts)

    const UserPinnedProducts = await getManager().find(
      PinnedProducts,
      {
        where: {
          userId: req.body.userId
        },
      }
    )
    // console.log(UserPinnedProducts)

    const AllProducts: any = []

    for (let i = 0; i < ProductsList.length; i++) {
      const item = {
        id: ProductsList[i].id,
        title: ProductsList[i].title,
        weight: ProductsList[i].weight,
        protein: ProductsList[i].protein,
        fats: ProductsList[i].fats,
        carb: ProductsList[i].carb,
        kkal: ProductsList[i].kkal,
        user: ProductsList[i]?.user?.id || null,
        category: {
          id: ProductsList[i]?.category?.id || null,
          title: ProductsList[i]?.category?.title || null,
        },
        favorite: false,
        pinned: false,
      }

      if (UserFavoriteProducts) {
        for (let f = 0; f < UserFavoriteProducts.length; f++) {
          if (UserFavoriteProducts[f].productId === item.id) {
            item.favorite = true
          }
        }
      }

      if (UserPinnedProducts) {
        for (let p = 0; p < UserPinnedProducts.length; p++) {
          if (UserPinnedProducts[p].productId === item.id) {
            item.pinned = true
          }
        }
      }

      AllProducts.push(item)
    }

    // console.log(AllProducts)

    const response = {
      updatedToken: req.body.updatedToken,
      data: AllProducts
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      message: 'Неизвестная ошибка.'
    })
  }
}

// module.exports.saveNewProduct = async function (req, res) {
//   try {
//     const product = await sequelize.transaction( async (t) => {
//       const savedProduct = await Products.create({
//         title: req.body.product.title,
//         weight: req.body.product.weight,
//         protein: req.body.product.protein,
//         fats: req.body.product.fats,
//         carb: req.body.product.carb,
//         kkal: req.body.product.kkal,
//         category: req.body.product.category,
//         userId: req.body.userId,
//       }, { transaction: t })

//       if (req.body.product.favorite) {
//         await FavoriteProducts.create({
//           userId: req.body.userId,
//           productId: savedProduct.dataValues.id
//         }, { transaction: t })
//       }

//       if (req.body.product.pinned) {
//         await PinnedProducts.create({
//           userId: req.body.userId,
//           productId: savedProduct.dataValues.id
//         }, { transaction: t })
//       }

//       const product = {...savedProduct.toJSON()}
//       product.favorite = req.body.product.favorite
//       product.pinned = req.body.product.pinned

//       return product
//     })

//     const response = {
//       updatedToken: req.body.updatedToken,
//       data: {
//         product: product
//       }
//     }

//     res.status(200).json(response)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

// module.exports.updateProduct = async function (req, res) {
//   try {
//     const product = await sequelize.transaction( async (t) => {
//       await Products.update(
//         {
//           title: req.body.product.title,
//           weight: req.body.product.weight,
//           protein: req.body.product.protein,
//           fats: req.body.product.fats,
//           carb: req.body.product.carb,
//           kkal: req.body.product.kkal,
//           category: req.body.product.category,
//         },
//         {
//           where: {
//             [Op.and]: [
//               { id: req.body.product.id },
//               { userId: req.body.userId }
//             ]
//           }
//         },
//         { transaction: t }
//       )

//       if (req.body.product.favorite) {
//         await FavoriteProducts.create({
//           userId: req.body.userId,
//           productId: req.body.product.id
//         }, { transaction: t })
//       } else {
//         await FavoriteProducts.destroy({
//           where: {
//             [Op.and]: [
//               { userId: req.body.userId },
//               { productId: req.body.product.id }
//             ]
//           }
//         }, { transaction: t })
//       }

//       if (req.body.product.pinned) {
//         await PinnedProducts.create({
//           userId: req.body.userId,
//           productId: req.body.product.id
//         }, { transaction: t })
//       } else {
//         await PinnedProducts.destroy({
//           where: {
//             [Op.and]: [
//               { userId: req.body.userId },
//               { productId: req.body.product.id }
//             ]
//           }
//         }, { transaction: t })
//       }

//       return true
//     })

//     const response = {
//       updatedToken: req.body.updatedToken,
//       data: {
//         product: product ? {...req.body.product} : false
//       }
//     }

//     res.status(200).json(response)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

// module.exports.removeProduct = async function (req, res) {
//   try {
//     const RemoveProduct = await Products.destroy({
//       where: {
//         [Op.and]: [
//           {id: req.params.id},
//           {userId: req.body.userId}
//         ]
//       }
//     })

//     const response = {
//       updatedToken: req.body.updatedToken,
//       data: {
//         removed: RemoveProduct ? true : false,
//         productId: req.params.id
//       }
//     }

//     res.status(200).json(response)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

const changeFavoriteParam = async (req: Request, res: Response): Promise<Response> => {
  try {

    // Поиск, есть ли продукт в избранном у пользователя
    const FavoriteProduct = await getManager().findOne(
      FavoriteProducts,
      {
        where: {
          userId: req.body.userId,
          productId: req.body.productId
        }
      }
    )

    let isFavorite = false

    if (FavoriteProduct) {
      // Удалить продукт из избранного
      await getManager().delete(FavoriteProducts, FavoriteProduct)
      isFavorite = false
    } else {
      // Добавить продукт в избранное
      getManager().save(FavoriteProducts, {
        userId: req.body.userId,
        productId: req.body.productId
      })
      isFavorite = true
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        productId: req.body.productId,
        favorite: isFavorite
      }
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      message: 'Неизвестная ошибка.'
    })
  }
}

const changePinnedParam = async (req: Request, res: Response): Promise<Response> => {
  try {

    // Поиск, есть ли продукт в избранном у пользователя
    const PinnedProduct = await getManager().findOne(
      PinnedProducts,
      {
        where: {
          userId: req.body.userId,
          productId: req.body.productId
        }
      }
    )

    let isPinned = false

    if (PinnedProduct) {
      // Удалить продукт из избранного
      await getManager().delete(PinnedProducts, PinnedProduct)
      isPinned = false
    } else {
      // Добавить продукт в избранное
      getManager().save(PinnedProducts, {
        userId: req.body.userId,
        productId: req.body.productId
      })
      isPinned = true
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        productId: req.body.productId,
        pinned: isPinned
      }
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      message: 'Неизвестная ошибка.'
    })
  }
}

export default {
  getAllProducts,
  changeFavoriteParam,
  changePinnedParam
}
