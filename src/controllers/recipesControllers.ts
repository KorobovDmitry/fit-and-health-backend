import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Recipes } from "../db/entities/Recipes"

const getRecipes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const RecipesList = await getRepository(Recipes)
      .createQueryBuilder('recipes')
      .where([{user: req.body.userId}, {user: null}])
      .leftJoin("recipes.recipeProducts", "recipeProducts")
      .addSelect(['recipeProducts.weightInRecipe', 'recipeProducts.product'])
      .leftJoin('recipeProducts.product', 'product')
      .addSelect(['product.id', 'product.title', 'product.weight', 'product.protein', 'product.fats', 'product.carb', 'product.kkal'])
      .leftJoin("recipes.user", "user")
      .addSelect(['user.id'])
      .offset(0)
      .limit(10)
      .orderBy({'recipes.id': 'ASC'})
      .getMany()
    // console.log(RecipesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: RecipesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

const getRecipeInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const RecipeInfo = await getRepository(Recipes)
      .createQueryBuilder('recipe')
      .select([
        'recipe.id',
        'recipe.title',
        'recipe.description',
        'recipe.cookingTimes',
        'recipe.cookingSkill'
      ])
      .where([{id: req.params.recipeId}])
      .leftJoin("recipe.recipeProducts", "recipeProducts")
      .addSelect(['recipeProducts.weightInRecipe', 'recipeProducts.product'])
      .leftJoin('recipeProducts.product', 'product')
      .addSelect(['product.id', 'product.title', 'product.weight', 'product.protein', 'product.fats', 'product.carb', 'product.kkal'])
      .leftJoinAndSelect('recipe.recipeSteps', 'recipeSteps')
      .leftJoinAndSelect('recipe.marks', 'marks')
      .leftJoin("recipe.user", "user")
      .addSelect(['user.id'])
      .getOne()
    // console.log(RecipeInfo)

    const response = {
      updatedToken: req.body.updatedToken,
      data: RecipeInfo
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

export default {
  getRecipes,
  getRecipeInfo
}
