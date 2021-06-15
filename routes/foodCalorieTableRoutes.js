const express = require('express')
const JwtGuard = require('../middleware/Guards/JwtGuard')
const foodCalorieTableControllers = require('../controllers/foodCalorieTableControllers')
const router = express.Router()

// http://localhost:3031/api/food-calorie-table/
router.get('/', JwtGuard, foodCalorieTableControllers.getAllProducts)
router.post('/save-product', JwtGuard, foodCalorieTableControllers.saveNewProduct)
router.post('/remove-product', JwtGuard, foodCalorieTableControllers.removeProduct)
router.post('/change-favorite-param', JwtGuard, foodCalorieTableControllers.changeFavoriteParam)

module.exports = router
