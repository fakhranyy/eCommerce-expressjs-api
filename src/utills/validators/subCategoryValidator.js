import { check } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddleware.js";

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory required")
    .isLength({ min: 2 })
    .withMessage("the min length is 3 letters")
    .isLength({ max: 32 })
    .withMessage("the max length is 32 letters"),
  check("category")
    .notEmpty()
    .withMessage("sub category must be belong to category")
    .isMongoId()
    .withMessage("invalid category id"),
  validatorMiddleware,
];

export const getSubCategoryValidator = [
  check("id")
    .notEmpty()
    .isMongoId()
    .withMessage("invalid subCategory id format"),
  validatorMiddleware,
];

export const updateSubCategoryValidator = [
  check("id")
    .notEmpty()
    .isMongoId()
    .withMessage("invalid subCategory id format"),
  validatorMiddleware,
];
export const deleteSubCategoryValidator = [
  check("id")
    .notEmpty()
    .isMongoId()
    .withMessage("invalid subCategory id format"),
  validatorMiddleware,
];
