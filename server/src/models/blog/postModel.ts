import { Schema, model } from "mongoose";
import { IPost } from "@_types/types";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleForUrl: {
      type: String,
      required: true,
      trim: true,
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
      maxLength: [200, "Description is up to 200 chars long.)"]
    },
    thumbnail: {
      type: String,
    },
    category: {
      type: String,
      trim: true,
      maxLength: [20, "Name is up to 20 chars long.)"],
    },
    privacy: {
      type: Boolean,
      required: true,
      default: false,
    },
    // user: { type: Schema.Types.ObjectId, ref: "user" },
    // category: { type: Schema.Types.String, ref: "category" },
  },
  { timestamps: true }
);

//Model 생성
export default model<IPost>("post", postSchema);
