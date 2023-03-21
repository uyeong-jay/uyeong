import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users from "@models/userModel";
import { IDecodedToken } from "@_types/types";
import { generateAccessToken } from "@utils/generateToken";

//새로고침 되었을때 유저 확인 + 토큰 새로 발급해주기
const refresh = async (req: Request, res: Response) => {
  try {
    //refresh_token(유저의 _id) 쿠키 가져오기
    const rf_token = req.cookies.refresh_token;
    if (!rf_token) return res.status(200).json({ msg: "Please login first." });

    //토큰 없으면 리프레쉬 토큰도 로그아웃 처럼 '' 로 바꾸기??

    //디코드 하기(jwt)
    const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
    if (!decoded) return res.status(400).json({ msg: "Please login first." });
    // console.log(decoded);
    // { id: '628c484bd2b44d75c5515c18', iat: 1653360788, exp: 1655952788 }

    //디코드된 _id로 유저 데이터 가져오기(findById)
    const user = await Users.findById(decoded.id).select("-password +rf_token"); //비번빼고 가져오기
    if (!user) return res.status(400).json({ msg: "This account doesn't exists." });

    //다른 브라우저에서 로그인시 re_token이 달라져 이전 브라우저에선 에러내기
    if (rf_token !== user.rf_token) return res.status(400).json({ msg: "Please login first" });
    // {
    //   _id: '-',
    //   nickname: '-',
    //   email: '-',
    //   avatar: '-',
    //   role: 'user',
    //   re_token: '-',
    //   createdAt: '-',
    //   updatedAt: '-',
    //   __v: 0
    // }

    const access_token = generateAccessToken({ id: user?._id });

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

export default refresh;
