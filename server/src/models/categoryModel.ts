import { Schema, model } from "mongoose";

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please add your category."],
			trim: true,
			unique: true,
			maxLength: [20, "Name is up to 20 chars long.)"],
		},
	},
	{ timestamps: true }
);

//Model 생성
export default model("category", categorySchema);
