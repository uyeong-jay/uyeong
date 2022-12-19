import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users from "@models/userModel";
import { IDecodedToken, IReqAuth } from "@_types/types";
import { generateAccessToken, generateRefreshToken } from "@utils/generateToken";

//새로고침 되었을때 유저 확인 + 토큰 새로 발급해주기
export const refresh = async (req: IReqAuth, res: Response) => {
  try {
    //refresh_token(유저의 _id) 쿠키 가져오기
    const rf_token = req.cookies.refresh_token;
    if (!rf_token) return res.status(200).json({ msg: "Please login first." });

    //디코드 하기(jwt)
    const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
    if (!decoded) return res.status(400).json({ msg: "Please login first." });
    // console.log(decoded);
    // { id: '628c484bd2b44d75c5515c18', iat: 1653360788, exp: 1655952788 }

    //디코드된 _id로 유저 데이터 가져오기(findById)
    const user = await Users.findById(decoded.id).select("-password"); //비번빼고 가져오기
    if (!user) return res.status(400).json({ msg: "This account doesn't exists." });
    // console.log(user);
    // {
    //   _id: '628c484bd2b44d75c5515c18',
    //   nickname: 'test1',
    //   email: 'test1@gmail.com',
    //   avatar: 'https://res.cloudinary.com/uyeong/image/upload/v1637676343/nextjs_media/igin1evr3clomdfy2ikm.png',
    //   role: 'user',
    //   type: 'register',
    //   createdAt: '2022-08-18T02:51:55.843Z',
    //   updatedAt: '2022-08-18T02:51:55.843Z',
    //   __v: 0
    // }

    const access_token = generateAccessToken({ id: user?._id });
    const refresh_token = generateRefreshToken({ id: user?._id });

    await Users.findOneAndUpdate({ _id: user?._id }, { refresh_token });

    //성공
    res.status(200).json({
      access_token,
      user,
      msg: "Refresh success!",
    });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};
