import asyncHandler from "express-async-handler";
import { SubCategoryModel } from "../models/subCategoryModel.js";
import slugify from "slugify";
import { ApiError } from "../utills/apiError.js";

/**
@desc Create subCategory
@route POST /api/v1/subcategories
@access private
*/
export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

/**
 * @desc  get all subcategories
 * @route GET /api/v1/subcategories
 * @method GET
 * @access public
 */
export const getSubCategories = asyncHandler(async (req, res) => {
  //? the two mehods that we are used with functions which return promises, before we use asyncHandler
  //! 1 - .then(()=>{}).catch(()=>{})
  //! 2 - try{} catch(){}
  const page = req.query.page * 1 || 1; // all queries treat as string
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; //* return data per page
  const subCategories = await SubCategoryModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ result: subCategories.length, page, data: subCategories });
});

/**
 * @desc  get specific subCategory by id
 * @route GET /api/v1/subcategories/:id
 * @method GET
 * @access public
 */
export const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findById(id);
  if (!subCategory) {
    // return res.status(404).json({ message: "Category not found" });
    return next(new ApiError("subCategory not found for this id", 404));
  }
  res.status(200).json({ data: subCategory });
});

/**
 * @desc  update specific subCategory by id
 * @route PUT /api/v1/subcategories/:id
 * @method PATCH
 * @access private
 */
export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category },
    { new: true } // to return the category after the update, not before it
  );
  if (!subCategory) {
    // return res.status(404).json({ message: "Category not found" });
    return next(new ApiError("SubCategory not found for this id", 404));
  }
  res.status(200).json({ data: subCategory });
});

/**
 * @desc  delete specific subCategory by id
 * @route DELETE /api/v1/subcategories/:id
 * @method DELETE
 * @access private
 */
export const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    // return res.status(404).json({ message: "Category not found" });
    return next(new ApiError("SubCategory not found for this id", 404));
  }
  res.status(204).send();
});
