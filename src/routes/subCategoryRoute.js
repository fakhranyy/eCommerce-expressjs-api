import { Router } from "express";
import {
  createFilterObj,
  createSubCategory,
  deleteSubcategory,
  getSubCategories,
  getSubCategory,
  setCategoryIdToBody,
  updateSubcategory,
} from "../services/SubCateoryService.js";
import {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} from "../utils/validators/subCategoryValidator.js";

//? mergeParmas -> Allow us to access params on another routers
const router = Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObj, getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .patch(updateSubCategoryValidator, updateSubcategory)
  .delete(deleteSubCategoryValidator, deleteSubcategory);

// remember to mount this routes in main file (server.js)
export default router;
