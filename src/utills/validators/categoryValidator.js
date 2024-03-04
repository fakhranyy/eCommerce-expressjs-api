import { check } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddleware.js";

export const getCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleware,
];

export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("the min length is 3 letters")
    .isLength({ max: 32 })
    .withMessage("the max length is 32 letters"),
  validatorMiddleware,
];
export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleware,
];
export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleware,
];
