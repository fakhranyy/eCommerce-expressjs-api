import { Schema, model } from "mongoose";

const categoryShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"], // boolean , message in case if faild
      unique: [true, "Category must be unique"],
      minLength: [3, "too short category name"],
      maxLength: [32, "too long category name"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// convert thr schema into model , that i can deal with it
export const CategoryModel = model("Category", categoryShema);
//! export { CategoryModel };
//! module.exports = Category //! the old way to do it
