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

//token 디코드시 얻는 데이터
export interface IDecodedToken {
	id?: string;
	iat: number;
	exp: number;
}

export interface IBlog {
	_id: typeof ObjectId;
	user: string;
	title: string;
	tags: [String];
	content: string;
	description: string;
	thumnail: string;
	category: string;
	_doc: object;
}
