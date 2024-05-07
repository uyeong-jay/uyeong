import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users from "@models/userModel";
import { IDecodedToken } from "@_types/types";
import { generateAccessToken } from "@utils/generateToken";

//유저확인
const refresh = async (req: Request, res: Response) => {
  try {
    //refresh_token 쿠키 확인
    const rf_token = req.cookies.refresh_token;
    if (!rf_token) return res.status(200).json({ msg: "User not logged in." });

    //디코드 with jwt
    const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
    if (!decoded) return res.status(400).json({ msg: "Please login again." });

    //디코드된 _id로 유저 데이터 확인
    const user = await Users.findById(decoded.id).select("-password +rf_token");
    if (!user) return res.status(400).json({ msg: "Account doesn't exist." });

    //로그인 페이지를 통해 직접 로그인하지 않은 경우(rf_token: 로그인시 생성됨 > 쿠키 및 access_token 만으로는 이용 불가)
    if (!user.rf_token) return res.status(400).json({ msg: "Please login first." });

    //다른곳에서 이미 로그인이 되어 있을때
    if (rf_token !== user.rf_token) {
      return res.status(400).json({ msg: "You're already logged in elsewhere." });
    }

    const access_token = generateAccessToken({ id: user?._id });

    //성공
    res.status(200).json({
      access_token,
      user,
      msg: "Refreshed successfully!",
    });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default refresh;
