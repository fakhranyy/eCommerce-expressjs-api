import { check, param } from "express-validator";
import { validationMiddleware } from "../../middlewares/validatorMiddleware.js";

// first the rules, then the validation Middleware error handling to catch the errors from the rules
export const getCategoryValidator = [
  param("id").isMongoId().withMessage(`Invalid category id format`),
  validationMiddleware,
];

export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage(`Category required`)
    .isLength({ min: 3 })
    .withMessage(`Too short category name`)
    .isLength({ max: 32 })
    .withMessage(`Too long category name FROM VA`),
  validationMiddleware,
];
export const updateCategoryValidator = [
  param("id").isMongoId().withMessage(`Invalid category id format`),
  validationMiddleware,
];
export const deleteCategoryValidator = [
  param("id").isMongoId().withMessage(`Invalid category id format`),
  validationMiddleware,
];
