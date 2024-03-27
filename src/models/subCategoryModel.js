import { Schema, model } from "mongoose";

//? Schema take 2 objects (Schema, object)
const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory must be unique"],
      minLength: [2, "Too short subCategory name"],
      maxLength: [32, "Too long subCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    //* relationships
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", //? we use the model name to refrence
      required: [true, "SubCategory must be belong to main category"], // boolean, message in case if faild
    },
  },
  { timestamps: true }
);

export const SubCategoryModel = model("SubCategory", subCategorySchema);
