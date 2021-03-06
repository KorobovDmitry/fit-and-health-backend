import express, { Router } from 'express'
import foodCalorieTableControllers from '../controllers/foodCalorieTable/index'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/food-calorie-table/page-info
/**
* @swagger
* /api/food-calorie-table/page-info:
*   get:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Информация по разделу
*     responses:
*       200:
*         description: Информация по разделу
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 products:
*                   type: integer
*                   description: Общее кол-во продуктов
*                 userProducts:
*                   type: integer
*                   description: Общее кол-во продуктов пользователя
*                 pinned:
*                   type: integer
*                   description: Общее кол-во закрепленных продуктов
*                 favorites:
*                   type: integer
*                   description: Общее кол-во избранных продуктов
*       500:
*         description: Неизвестная ошибка
*/
router.get('/page-info', JwtGuard, foodCalorieTableControllers.fetchPageInfo)

// http://localhost:3031/api/food-calorie-table/product-categories
/**
* @swagger
* /api/food-calorie-table/product-categories:
*   get:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Список категорий продуктов
*     responses:
*       200:
*         description: Список категорий продуктов
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: Id категории
*                   title:
*                     type: string
*                     description: Название категории
*       500:
*         description: Неизвестная ошибка
*/
router.get('/product-categories', JwtGuard, foodCalorieTableControllers.fetchProductCategories)

// http://localhost:3031/api/food-calorie-table/
/**
* @swagger
* /api/food-calorie-table/:
*   get:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Список продуктов
*     parameters:
*     - in: query
*       name: searchString
*       description: Строка поиска
*       schema:
*         type: string
*     - in: query
*       name: userType
*       description: userType (ALL, MY)
*       schema:
*         type: string
*     - in: query
*       name: userRelation
*       description: userRelation (ALL, PINNED, FAVORITE)
*       schema:
*         type: string
*     - in: query
*       name: categories
*       description: categories (список id категорий для выборки)
*       schema:
*         type: string
*     - in: query
*       name: orderBy
*       description: Сортировка
*       schema:
*         type: string
*     - in: query
*       name: sortDirection
*       description: Направление сортировки
*       schema:
*         type: string
*     responses:
*       200:
*         description: Список продуктов
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: Id продукта
*                   title:
*                     type: string
*                     description: Название продукта
*                   weight:
*                     type: integer
*                     description: Вес продукта (по умолчанию 100 гр.)
*                   protein:
*                     type: integer
*                     description: Кол-во белков (на 100 гр.)
*                   fats:
*                     type: integer
*                     description: Кол-во жиров (на 100 гр.)
*                   carb:
*                     type: integer
*                     description: Кол-во углеводов (на 100 гр.)
*                   kkal:
*                     type: integer
*                     description: Калорийность (на 100 гр.)
*                   user:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: Id пользователя
*                   category:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: Id категории продукта
*                       title:
*                         type: string
*                         description: Название категории продукта
*                   favorite:
*                     type: boolean
*                     description: Признак добавления в избранное у авторизованного пользователя
*                   pinned:
*                     type: boolean
*                     description: Признак добавления в закрепленное у авторизованного пользователя
*       500:
*         description: Неизвестная ошибка
*/
router.get('/', JwtGuard, foodCalorieTableControllers.fetchProductsList)

// http://localhost:3031/api/food-calorie-table/save-product
/**
* @swagger
* /api/food-calorie-table/save-product:
*   post:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Создать новый продукт
*     security:
*       - jwt: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required: true
*             properties:
*               product:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: Id продукта
*                   title:
*                     type: string
*                     description: Название продукта
*                   protein:
*                     type: integer
*                     description: Кол-во белков (на 100 гр.)
*                   fats:
*                     type: integer
*                     description: Кол-во жиров (на 100 гр.)
*                   carb:
*                     type: integer
*                     description: Кол-во углеводов (на 100 гр.)
*                   kkal:
*                     type: integer
*                     description: Калорийность (на 100 гр.)
*                   user:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: Id пользователя
*                   category:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: Id категории продукта
*                       title:
*                         type: string
*                         description: Название категории продукта
*                   favorite:
*                     type: boolean
*                     description: Признак добавления в избранное у авторизованного пользователя
*                   pinned:
*                     type: boolean
*                     description: Признак добавления в закрепленное у авторизованного пользователя
*     responses:
*       200:
*         description: Данные продукта обновлены
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   description: Id продукта
*                 title:
*                   type: string
*                   description: Название продукта
*                 protein:
*                   type: integer
*                   description: Кол-во белков (на 100 гр.)
*                 fats:
*                   type: integer
*                   description: Кол-во жиров (на 100 гр.)
*                 carb:
*                   type: integer
*                   description: Кол-во углеводов (на 100 гр.)
*                 kkal:
*                   type: integer
*                   description: Калорийность (на 100 гр.)
*                 user:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: Id пользователя
*                 category:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: Id категории продукта
*                     title:
*                       type: string
*                       description: Название категории продукта
*                 favorite:
*                   type: boolean
*                   description: Признак добавления в избранное у авторизованного пользователя
*                 pinned:
*                   type: boolean
*                   description: Признак добавления в закрепленное у авторизованного пользователя
*       400:
*         description: Неверный запрос
*       404:
*         description: Не найдено
*       500:
*         description: Неизвестная ошибка
*/
router.post('/save-product', JwtGuard, foodCalorieTableControllers.saveNewProduct)

// http://localhost:3031/api/food-calorie-table/update-product
/**
* @swagger
* /api/food-calorie-table/update-product:
*   put:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Обновить данные у продукта
*     security:
*       - jwt: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required: true
*             properties:
*               product:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: Id продукта
*                   title:
*                     type: string
*                     description: Название продукта
*                   protein:
*                     type: integer
*                     description: Кол-во белков (на 100 гр.)
*                   fats:
*                     type: integer
*                     description: Кол-во жиров (на 100 гр.)
*                   carb:
*                     type: integer
*                     description: Кол-во углеводов (на 100 гр.)
*                   kkal:
*                     type: integer
*                     description: Калорийность (на 100 гр.)
*                   category:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: Id категории продукта
*                       title:
*                         type: string
*                         description: Название категории продукта
*                   favorite:
*                     type: boolean
*                     description: Признак добавления в избранное у авторизованного пользователя
*                   pinned:
*                     type: boolean
*                     description: Признак добавления в закрепленное у авторизованного пользователя
*     responses:
*       200:
*         description: Данные продукта обновлены
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   description: Id продукта
*                 title:
*                   type: string
*                   description: Название продукта
*                 protein:
*                   type: integer
*                   description: Кол-во белков (на 100 гр.)
*                 fats:
*                   type: integer
*                   description: Кол-во жиров (на 100 гр.)
*                 carb:
*                   type: integer
*                   description: Кол-во углеводов (на 100 гр.)
*                 kkal:
*                   type: integer
*                   description: Калорийность (на 100 гр.)
*                 category:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: Id категории продукта
*                     title:
*                       type: string
*                       description: Название категории продукта
*                 favorite:
*                   type: boolean
*                   description: Признак добавления в избранное у авторизованного пользователя
*                 pinned:
*                   type: boolean
*                   description: Признак добавления в закрепленное у авторизованного пользователя
*       404:
*         description: Не найдено
*       500:
*         description: Неизвестная ошибка
*/
router.put('/update-product', JwtGuard, foodCalorieTableControllers.updateProduct)

// http://localhost:3031/api/food-calorie-table/change-favorite-param/:productId
/**
* @swagger
* /api/food-calorie-table/change-favorite-param/{productId}:
*   put:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Изменить признак "избранного" для продукта у пользователя
*     security:
*       - jwt: []
*     parameters:
*       - in: path
*         name: productId
*         required: true
*         schema:
*           type: integer
*         description: ID продукта
*     responses:
*       200:
*         description: Признак "избранного" для продукта изменен
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 favorite:
*                   type: boolean
*                   description: Признак "изранного" для продукта у пользователя
*                 productId:
*                   type: integer
*                   description: Id продукта
*       404:
*         description: Не найдено
*       500:
*         description: Неизвестная ошибка
*/
router.put('/change-favorite-param/:productId', JwtGuard, foodCalorieTableControllers.changeFavoriteParam)

// http://localhost:3031/api/food-calorie-table/change-pinned-param/:productId
/**
* @swagger
* /api/food-calorie-table/change-pinned-param/{productId}:
*   put:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Изменить признак "закрепленного" для продукта у пользователя
*     security:
*       - jwt: []
*     parameters:
*       - in: path
*         name: productId
*         required: true
*         schema:
*           type: integer
*         description: ID продукта
*     responses:
*       200:
*         description: Признак "закрепленного" для продукта изменен
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 pinned:
*                   type: boolean
*                   description: Признак "закрепленного" для продукта у пользователя
*                 productId:
*                   type: integer
*                   description: Id продукта
*       404:
*         description: Не найдено
*       500:
*         description: Неизвестная ошибка
*/
router.put('/change-pinned-param/:productId', JwtGuard, foodCalorieTableControllers.changePinnedParam)

// http://localhost:3031/api/food-calorie-table/remove-product/:productId
/**
* @swagger
* /api/food-calorie-table/remove-product/{productId}:
*   delete:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Удаление продукта
*     security:
*       - jwt: []
*     parameters:
*       - in: path
*         name: productId
*         required: true
*         schema:
*           type: integer
*         description: ID продукта
*     responses:
*       200:
*         description: Продукт удален
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 removed:
*                   type: boolean
*                   description: Признак успешного удаления продукта
*                 productId:
*                   type: integer
*                   description: Id продукта
*       404:
*         description: Не найдено
*       500:
*         description: Неизвестная ошибка
*/
router.delete('/remove-product/:productId', JwtGuard, foodCalorieTableControllers.removeProduct)

export default router
