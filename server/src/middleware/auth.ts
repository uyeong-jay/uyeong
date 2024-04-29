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
    // { id: '62-----------------4f', iat: 1667445445, exp: 1667446345 }

    //디코드된 _id로 유저 데이터 가져오기(findOne)
    const user = await Users.findOne({ _id: decoded.id }).select("-password"); //비번제거
    if (!user) return res.status(400).json({ msg: "This user doesn't exist." });

    req.user = user;

    next();
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default auth;
