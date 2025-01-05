import { Request } from "express";
import { Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  nickname: string;
  email: string;
  password: string;
  cf_password: string;
  avatar?: string;
  role: string;
  rf_token?: string;
  _doc: object;
}

//user 증명 데이터를 가져올때 Request 타입 대신 사용
export interface IReqAuth extends Request {
  user?: IUser;
}

//token 디코드시 얻는 데이터
export interface IDecodedToken {
  id?: string;
  iat: number;
  exp: number;
}

export interface IPost extends Document {
  _id: Types.ObjectId;
  user: string;
  title: string;
  tags: [string];
  content: string;
  description: string;
  thumnail: string;
  category: string;
  _doc: object;
}

export interface IComment extends Document {
  post_id: string;
  post_title: string;
  user: string;
  content: string;
  comment_id: string;
  reply: string;
  replies: [object];
  _doc: object;
}
