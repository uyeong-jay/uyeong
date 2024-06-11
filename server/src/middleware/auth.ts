import { Response, NextFunction } from "express";
import Users from "@models/userModel";
import { IReqAuth } from "@_types/types";
import { authToken } from "@utils/authToken";

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    //access_token(유저의 _id) 헤더에서 가져오기
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authorization." });

    //디코드 with jwt
    const { decoded } = authToken(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decoded.id)
      return res
        .status(400)
        .json({ msg: "Sorry, your session has expired. Please refresh the current page to continue." });

    //디코드된 _id로 유저 데이터 가져오기(findOne)
    const user = await Users.findOne({ _id: decoded.id }).select("-password +rf_token"); //비번제거
    if (!user) return res.status(400).json({ msg: "This user doesn't exist." });

    //refresh_token 쿠키 가져오기
    const rf_token = req.cookies.refresh_token;

    //다른곳에서 이미 로그인이 되어 있을때
    if (rf_token !== user.rf_token) {
      return res.status(400).json({ msg: "You're already logged in elsewhere." });
    }

    req.user = user;

    next();
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default auth;
