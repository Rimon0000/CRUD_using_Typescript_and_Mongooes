import express from 'express'
import { userControllers } from './user.controller'

const router = express.Router()

router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUsers)
router.get('/:userId', userControllers.getSingleUser)
router.delete('/:userId', userControllers.deleteSingleUser)
router.put('/:userId', userControllers.updateSingleUser)

export const userRoutes = router