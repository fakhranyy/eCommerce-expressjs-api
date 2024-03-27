import { Router } from "express";
import {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} from "../utills/validators/subCategoryValidator.js";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
} from "../services/subCategoryService.js";

const router = Router();
router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

export default router;
