import { Schema, model, Types } from "mongoose";
import { IComment } from "@_types/types";

const commentModel = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    content: {
      type: String,
      require: true,
    },
    post_title: {
      type: String,
      require: true,
    },
    // comment: {
    //   type: Types.ObjectId,
    //   ref: "comment",
    // },
    // reply: [{ type: Types.ObjectId, ref: "comment" }],
    // reply_user: { type: Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

export default model<IComment>("comment", commentModel);
