import { Schema, model } from "mongoose";

interface IUser {
	name: string;
	email: string;
	password: string;
	avatar?: string;
	role: string;
	type: string;
	_doc: object;
}

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, "Please add your name."],
			trim: true,
			maxLength: [20, "Your name must be 20 chars or less"],
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
