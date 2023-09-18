import { Schema, model } from "mongoose";
import { IUser } from "@_types/types";

const userSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Please add your name."],
      trim: true,
      maxLength: [20, "Your name must be 20 chars or less.)"],
    },
    email: {
      type: String,
      required: [true, "Please add your email."],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add your password."],
      minLength: [6, "Your password must be 6 chars or more."],
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/uyeong/image/upload/v1672882372/uyeong-blog/igin1evr3clomdfy2ikm_aa4oca.png",
    },
    role: {
      type: String,
      default: "user", //or admin
    },
    rf_token: { type: String, select: false },
  },
  { timestamps: true }
  //timestamps - mogoose
  //1. 해당 스키마에 createdAt, updatedAt를  자동 추가 및 업데이트
  //2. 타입은 Date
);

//Model 생성
export default model<IUser>("user", userSchema);
