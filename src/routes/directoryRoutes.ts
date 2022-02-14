import express, { Router } from 'express'
import directoryControllers from '../controllers/directory/index'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/directory/skill-types/
/**
* @swagger
* /api/directory/skill-types:
*   get:
*     tags:
*       - Общие справочники
*     summary: Список вариантов сложности (мастерства)
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список вариантов сложности (мастерства)
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 updatedToken:
*                   type: string
*                   description: Обновленный токен авторизации
*                 data:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: ID мышечной группы
*                       excellenceTitle:
*                         type: string
*                         description: Название уровня навыка (мастерства)
*                       complexityTitle:
*                         type: string
*                         description: Название уровня навыка (сложности)
*                       value:
*                         type: string
*                         description: Числовое обозначение уровня сложности
*       401:
*         description: Ошибка авторизации
*/
router.get('/skill-types', JwtGuard, directoryControllers.fetchSkillTypes)

// http://localhost:3031/api/directory/training-types/
/**
* @swagger
* /api/directory/training-types:
*   get:
*     tags:
*       - Общие справочники
*     summary: Список типов тренировок
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список типов тренировок
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 updatedToken:
*                   type: string
*                   description: Обновленный токен авторизации
*                 data:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: ID типа тренировки
*                       title:
*                         type: string
*                         description: Название типа тренировки
*       401:
*         description: Ошибка авторизации
*/
router.get('/training-types', JwtGuard, directoryControllers.fetchTrainingTypes)

export default router
