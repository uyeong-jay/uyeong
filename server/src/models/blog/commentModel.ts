import { Schema, model, Types } from "mongoose";
import { IComment } from "@_types/types";

const commentModel = new Schema(
  {
    post_id: {
      type: String,
      require: true,
    },
    post_title: {
      type: String,
      require: true,
    },

    user: { type: Schema.Types.ObjectId, ref: "user" },

    content: {
      type: String,
      require: true,
    },

    comment_id: { type: Types.ObjectId, ref: "comment" },

    replies: [{ type: Types.ObjectId, ref: "comment" }],
  },
  {
    timestamps: true,
  }
);

export default model<IComment>("comment", commentModel);
