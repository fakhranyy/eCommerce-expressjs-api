import express from "express";
import {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
} from "../services/categoryService.js";

const router = express();
// router.get("/", getCategories);
// router.post("/", createCategory); //? these are example to hwo write short code as you can
router.route("/").get(getCategories).post(createCategory);
router.route("/:id").get(getCategory).patch(updateCategory).delete(deleteCategory);

export default router;
