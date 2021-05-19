const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Op = Sequelize.Op;
const MealPlanerInfo = require('../models/MealPlanerInfo')

// Формат даты для всего проекта --- 2021-12-29

module.exports.getMealPlanerInfo = async function (req, res) {
  try {
    const mealPlanDayInfo = await sequelize.transaction( async (t) => {
      if (req.query && req.query.date) {
        // Поиск плана питания на день в соответствие с указанной датой
        const mealPlan = await MealPlanerInfo.findOne({
          where: {
            [Op.and]: [
              { userId: req.body.userId },
              { date: new Date(req.query.date).getTime() / 1000 } // переданная дата (строка) приведенная в милесекунды
            ]
          },
        }, { transaction: t })

        if (mealPlan) {
          // Вернуть данные о найденном плане питания на указанный день
          return mealPlan
        } else {
          return false
        }
      } else {
        const currentDate = new Date().toJSON().split('T')[0]
        // Поиск текущей даты, если дата не указана
        const mealPlan = await MealPlanerInfo.findOne({
          where: {
            [Op.and]: [
              { userId: req.body.userId },
              { date: new Date(currentDate).getTime() / 1000 } // текущая дата в милисекундах
            ]
          },
        }, { transaction: t })

        if (mealPlan) {
          // Вернуть данные о найденном плане питания на текущий день
          return mealPlan
        } else {
  
          return false
        }
      }
    })

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        mealPlanerInfo: mealPlanDayInfo
      }
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports.saveMealPlanerInfo = async function (req, res) {
  try {
    // console.log(req.body)

    const mealPlan = await MealPlanerInfo.findOne({
      where: {
        [Op.and]: [
          { userId: req.body.userId },
          { id: req.body.mealPlanerInfo.id }
        ]
      },
    })

    if (mealPlan) {
      // Вносим изменения в существующий план рациона на сутки
      console.log('Запись уже есть в БД')
    } else {
      const currentDate = new Date().toJSON().split('T')[0]

      const savedMealPlan = await MealPlanerInfo.create({
        userId: req.body.userId,
        date: new Date(currentDate).getTime() / 1000, // текущая дата в милисекундах
        targetProtein: req.body.mealPlanerInfo.targetProtein,
        targetFats: req.body.mealPlanerInfo.targetFats,
        targetCarb: req.body.mealPlanerInfo.targetCarb,
        targetWeight: req.body.mealPlanerInfo.targetWeight,
        title: req.body.mealPlanerInfo.title,
        description: req.body.mealPlanerInfo.description,
        marks: JSON.stringify(req.body.mealPlanerInfo.marks),
        social: JSON.stringify(req.body.mealPlanerInfo.social),
        mealParts: JSON.stringify(req.body.mealPlanerInfo.mealParts)
      })

      console.log(savedMealPlan.dataValues)

      const response = {
        updatedToken: req.body.updatedToken,
        data: {
          mealPlanerInfo: savedMealPlan
        }
      }
      res.status(200).json(response)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
