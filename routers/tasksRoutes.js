import express from "express"
import { createTasks, updateTask,getTasks, deleteTask } from "../controllers/taskControllers.js"
import { authorizedRoles, protect } from "../controllers/authController.js"

const router = express.Router()


router.route('/').get(protect,getTasks).post(protect,createTasks)
router.route('/:id').put(protect,authorizedRoles('admin'),updateTask).delete(protect,deleteTask)

export default router