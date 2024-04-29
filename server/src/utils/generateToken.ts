import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateAccessToken = (payload: object) => {
  //토큰 생성
  //- jwt.sign(userInfo, secretKey, options, 익명함수)
  //  - secretKey는 password generator 이용
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "12h",
  });
};

export const generateRefreshToken = (payload: object, res: Response) => {
  const refresh_token = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: "30d",
  });

  return refresh_token;
};

//사용: const refresh_token = generateAccessToken({ id: user._id });
