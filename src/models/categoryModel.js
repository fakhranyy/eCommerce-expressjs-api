import { Schema, model } from "mongoose";

const categoryShema = new Schema({
  name: String,
});

const CategoryModel = model("Category", categoryShema);
export { CategoryModel };
// module.exports = Category //! the old way to do it
