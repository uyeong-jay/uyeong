import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your category name."],
      trim: true,
      unique: true,
      maxLength: [20, "the category name must be less than 20 characters."],
    },
  },
  { timestamps: true }
);

//Model 생성
export default model("category", categorySchema);
