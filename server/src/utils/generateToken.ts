import jwt from "jsonwebtoken";
import { Response } from "express";

//실행시 매번 다른 토큰 생성

export const generateAccessToken = (payload: object) => {
  const access_token = jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "12h",
  });

  return access_token;
};

export const generateRefreshToken = (payload: object, res: Response) => {
  const refresh_token = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: "7d",
  });

  return refresh_token;
};

//사용: const access_token = generateAccessToken({ id: user._id });
