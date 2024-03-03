//? All business logic about categories are written here
import slugify from "slugify";
import { CategoryModel } from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utills/apiError.js";

/**
 * @desc  get all categories
 * @route GET /api/v1/categories
 * @method GET
 * @access public
 */
export const getCategories = asyncHandler(async (req, res) => {
  //? the two mehods that we are used with functions which return promises, before we use asyncHandler
  //! 1 - .then(()=>{}).catch(()=>{})
  //! 2 - try{} catch(){}
  const page = req.query.page * 1 || 1; // all queries treat as string
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; //* return data per page
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, page, data: categories });
});

/**
 * @desc  get specific category by id
 * @route GET /api/v1/categories/:id
 * @method GET
 * @access public
 */
export const getCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await CategoryModel.findById(id);
  if (!category) {
    // return res.status(404).json({ message: "Category not found" });
    return next(new ApiError("Category not found for this id", 404));
  }
  res.status(200).json({ data: category });
});

/**
 * @desc  create new category
 * @route GET /api/v1/categories
 * @method POST
 * @access private
 */
export const createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

/**
 * @desc  update specific category by id
 * @route PUT /api/v1/categories/:id
 * @method PATCH
 * @access private
 */
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await CategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true } // to return the category after the update, not before it
  );
  if (!category) {
    // return res.status(404).json({ message: "Category not found" });
    return next(new ApiError("Category not found for this id", 404));
  }
  res.status(200).json({ data: category });
});

/**
 * @desc  delete specific category by id
 * @route DELETE /api/v1/categories/:id
 * @method DELETE
 * @access private
 */
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    // return res.status(404).json({ message: "Category not found" });
    return next(new ApiError("Category not found for this id", 404));
  }
  res.status(204).send();
});
