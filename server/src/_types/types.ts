import { Request } from "express";
import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

export interface IUser {
	_id: typeof ObjectId;
	nickname: string;
	email: string;
	password: string;
	cf_password: string;
	avatar?: string;
	role: string;
	type: string;
	_doc: object;
}

export interface IReqAuth extends Request {
	user?: IUser;
}
