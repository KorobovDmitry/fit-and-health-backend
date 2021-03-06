require('module-alias/register') // Требуется для работы alias? указанных в package.json

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
import { dataSource } from './dataSource'

// Импорт роутов
import directoryRoutes from './routes/directoryRoutes'
import authRoutes from './routes/authRoutes'
import profilesRoutes from './routes/profilesRoutes'
import foodCalorieTableRoutes from './routes/foodCalorieTableRoutes'
import recipesRoutes from './routes/recipesRoutes'
import mealPlanerRoutes from './routes/mealPlanerRoutes'
import exercisesRoutes from './routes/exercisesRoutes'
import trainingDiariesRoutes from './routes/trainingDiariesRoutes'
import trainingProgramsRoutes from './routes/trainingProgramsRoutes'
import trainingProcessRoutes from './routes/trainingProcessRoutes'

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
  origin: '*',
  methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',
  allowedHeaders: '*',
  exposedHeaders: ['updated-token'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

// Настройка и инициализация helmet
app.use(helmet())

// Для получения доступа к папке напрямую
// localhost:3000/uploads/названиеКартинки.png
app.use('/public', express.static('public'))

// Routes
app.use('/api/directory', directoryRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/profiles', profilesRoutes)
app.use('/api/food-calorie-table', foodCalorieTableRoutes)
app.use('/api/recipes', recipesRoutes)
app.use('/api/meal-planer', mealPlanerRoutes)
app.use('/api/exercises', exercisesRoutes)
app.use('/api/training-diary', trainingDiariesRoutes)
app.use('/api/training-programs', trainingProgramsRoutes)
app.use('/api/training-process', trainingProcessRoutes)

// Подключение к базе данных
dataSource.initialize()
  .then(async () => {
    await dataSource.runMigrations()

    consola.ready({
      message: `Database connected success`,
      badge: true
    })
  })
  .catch((error) => {
    consola.error({
      message: `Error during Data Source initialization\n${error}`,
      badge: true
    })
  })



// Запуск сервера
const HOST: string = process.env.HOST || 'localhost'
const PORT: any = process.env.PORT || 3031

app.listen(PORT, HOST, () => {
  consola.ready({
    message: `Server http://${HOST}:${PORT}`,
    badge: true
  })
  consola.ready({
    message: `Swagger http://${HOST}:${PORT}/swagger`,
    badge: true
  })
})
