import express from "express";
import { getCategories } from "../services/categoryService.js";

const router = express();
router.get("/", getCategories);

export default router;
