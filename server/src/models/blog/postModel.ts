import { Schema, model } from "mongoose";
import { IPost } from "@_types/types";

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    tags: {
      type: [String],
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 200,
    },
    thumbnail: {
      type: String,
    },
    privacy: {
      type: Boolean,
      required: true,
      default: false,
    },
    category: { type: Schema.Types.String, ref: "category" },
  },
  { timestamps: true }
);

//Model 생성
export default model<IPost>("post", postSchema);
