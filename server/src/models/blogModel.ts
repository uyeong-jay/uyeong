import { Schema, model, Types } from "mongoose";
import { IBlog } from "@_types/types";

const blogSchema = new Schema(
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
      default: "https://res.cloudinary.com/uyeong/image/upload/v1668671461/uyeong-blog/purplePNG_umvvlq.png",
    },
    privacy: {
      type: Boolean,
      required: true,
      default: false,
    },
    category: { type: Schema.Types.ObjectId, ref: "category" },
  },
  { timestamps: true }
);

//Model 생성
export default model<IBlog>("blog", blogSchema);
