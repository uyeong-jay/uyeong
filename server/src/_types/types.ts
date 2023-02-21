import { Request } from "express";
import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

export interface IUser extends Document {
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

export interface IComment extends Document {
  user: string;
  post_id: string;
  content: string;
  reply: string;
  reply_user: string;
  _doc: object;
  // comment_root: string;
}
