import express from "express"
import { createTasks, updateTask,getTasks, deleteTask } from "../controllers/taskControllers.js"

const router = express.Router()

router.get('/', getTasks)
router.post('/', createTasks)
router.put('/:id', updateTask)
router.delete('/:id',deleteTask)

export default router