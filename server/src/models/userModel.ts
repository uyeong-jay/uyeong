import { Schema, model } from "mongoose";
import { IUser } from "@_types/types";

const userSchema = new Schema<IUser>(
	{
		nickname: {
			type: String,
			required: [true, "이름 칸을 채워주세요(Please add your name.)"],
			trim: true,
			maxLength: [20, "이름은 적어도 20자 이하여야 합니다.(Your name must be 20 chars or less.)"],
		},
		email: {
			type: String,
			required: [true, "이메일 칸을 채워주세요.\n(Please add your email.)"],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "비밀번호 칸을 채워주세요.\n(Please add your password.)"],
			minLength: [6, "비밀번호는 적어도 6자 이상이여야 합니다.\n(Your password must be 6 chars or more.)"],
		},
		cf_password: {
			type: String,
			required: [true, "비밀번호 확인 칸을 채워주세요.\n(Please add your password.)"],
			minLength: [
				6,
				"확인 비밀번호 또한 적어도 6자 이상이여야 합니다.\n(Your confirm password also must be 6 chars or more.)",
			],
		},
		avatar: {
			type: String,
			default: "https://res.cloudinary.com/uyeong/image/upload/v1637676343/nextjs_media/igin1evr3clomdfy2ikm.png",
		},
		role: {
			type: String,
			default: "user", //admin
		},
		type: {
			type: String,
			deafault: "register", //login
		},
	},
	{ timestamps: true }
	//timestamps - mogoose
	//1. 해당 스키마에 createdAt, updatedAt를  자동 추가 및 업데이트
	//2. 타입은 Date
);

//Model 생성
export default model("user", userSchema);
