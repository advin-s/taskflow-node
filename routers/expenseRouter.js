import express from "express";
import { getExpenses } from "../controllers/expenseController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router()

router.get('/',protect,getExpenses)

export default router