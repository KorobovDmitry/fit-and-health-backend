if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

import express, { Application } from "express"
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

import cors from 'cors'
import helmet from 'helmet'
import consola from 'consola'
import "reflect-metadata"
import { createConnection } from 'typeorm'

// Импорт роутов
import authRoutes from './routes/authRoutes'
import profileRoutes from './routes/profileRoutes'
// import mealPlanerRoutes from './routes/mealPlanerRoutes'
import foodCalorieTableRoutes from './routes/foodCalorieTableRoutes'
import recipesBookRoutes from './routes/recipesBookRoutes'
// import recipeRoutes from './routes/recipeRoutes'
// import trainingDiaryRoutes from './routes/trainingDiaryRoutes'
// import ExercisesRoutes from './routes/ExercisesRoutes'
// import settingsRoutes from './routes/settingsRoutes'

// Инициализация приложения
const app: Application = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Использование swagger в режиме разработки
if (process.env.NODE_ENV !== 'production') {
  // Настройки swagger
  const swaggerJsDocOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Fit and Health',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          jwt: {
            type: "http",
            scheme: "bearer",
            in: "header",
            bearerFormat: "JWT"
          },
        }
      },
      security: {
        jwt: []
      }
    },
    apis: ['**/*.ts'],
  }

  const swaggerJsDoc = swaggerJsdoc(swaggerJsDocOptions)
  const swaggerOptions = {
    explorer: false
  }
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc, swaggerOptions))
}

// Настройки и инициализация CORS
const corsOptions = {
  "origin": "*",
  "methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD",
  'Access-Control-Allow-Headers': 'Authorization',
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
}
app.use(cors(corsOptions))

// Настройка и инициализация helmet
app.use(helmet())

// Для получения доступа к папке напрямую
// localhost:3000/uploads/названиеКартинки.png
app.use('/public', express.static('public'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/food-calorie-table', foodCalorieTableRoutes)
app.use('/api/recipes-book', recipesBookRoutes)
// app.use('/api/recipe', recipeRoutes)
// app.use('/api/meal-planer', mealPlanerRoutes)
// app.use('/api/training-diary', trainingDiaryRoutes)
// app.use('/api/exercises', ExercisesRoutes)
// app.use('/api/settings', settingsRoutes)

// Подключение к базе данных
createConnection().then(connection => {
  consola.ready({
    message: `DB connected success`,
    badge: true
  })
}).catch(error => console.log(error))

// Запуск сервера
const HOST: string = process.env.HOST || 'localhost'
const PORT: any = process.env.PORT || 3031

app.listen(PORT, HOST, () => {
  consola.ready({
    message: `Server listening on http://${HOST}:${PORT}`,
    badge: true
  })
})
