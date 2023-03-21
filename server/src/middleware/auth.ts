import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Users from "@models/userModel";
import { IDecodedToken, IReqAuth } from "@_types/types";

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    //access_token(유저의 _id) 헤더에서 가져오기
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authorization." });

    //디코드하기(jwt)
    const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decoded) return res.status(400).json({ msg: "Invalid Authorization." });
    // console.log(decoded);
    // { id: '62fe3d99c15dd2880b5f864f', iat: 1667445445, exp: 1667446345 }

    //디코드된 _id로 유저 데이터 가져오기(findOne)
    const user = await Users.findOne({ _id: decoded.id }).select("-password"); //비번빼고 가져오기
    if (!user) return res.status(400).json({ msg: "User doesn't exists." });
    // console.log(user);
    // {
    // 	_id: new ObjectId("62fe3d99c15dd2880b5f864f"),
    // 	nickname: 'test1',
    // 	email: 'test1@gmail.com',
    // 	avatar: 'https://res.cloudinary.com/uyeong/image/upload/v1637676343/nextjs_media/igin1evr3clomdfy2ikm.png',
    // 	role: 'user',
    // 	createdAt: 2022-08-18T13:24:41.282Z,
    // 	updatedAt: 2022-11-03T03:34:49.496Z,
    // 	__v: 0
    // }

    req.user = user;

    next();
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default auth;
