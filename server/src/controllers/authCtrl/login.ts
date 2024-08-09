import { Request, Response } from "express";
import Users from "@models/userModel";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "@utils/generateToken";

const login = async (req: Request, res: Response) => {
  try {
    //client 데이터 가져오기
    const { email, password } = req.body;

    //email 조회
    const user = await Users.findOne({ email }).select("+password +rf_token");
    if (!user) return res.status(400).json({ msg: "Account doesn't exist." });

    //password 조회(bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." });

    if (user.rf_token) {
      //로그아웃 페이지 통해 로그아웃이 되지 않았을때
      await Users.findOneAndUpdate({ _id: user._id }, { rf_token: "" });

      return res.status(400).json({
        msg: "Since your last logout wasn’t completed successfully, please log in again to ensure you have proper access to your account.",
      });
    }

    const refresh_token = generateRefreshToken({ id: user._id }, res);

    await Users.findOneAndUpdate({ _id: user._id }, { rf_token: refresh_token });

    //refresh token 쿠키 생성(client)
    res.cookie("refresh_token", refresh_token, {
      path: "/", //client path
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // day*hour*min*sec*ms //7days
    });

    const access_token = generateAccessToken({ id: user._id });

    //성공
    res.status(200).json({
      access_token,
      user: { ...user._doc, password: "" }, //비번 제외(IUser type(with _doc) model)
      msg: "Logged in successfully!",
    });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default login;
