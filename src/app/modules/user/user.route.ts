import express from 'express'
import { userControllers } from './user.controller'

const router = express.Router()

router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUsers)
router.get('/:userId', userControllers.getSingleUser)
router.delete('/:userId', userControllers.deleteSingleUser)
router.put('/:userId', userControllers.updateSingleUser)

// order 
router.put('/:userId/orders', userControllers.putOrder)
router.get('/:userId/orders', userControllers.getAllOrders)
router.get('/:userId/orders/total-price', userControllers.calculateAllOrdersPrice)




export const userRoutes = router