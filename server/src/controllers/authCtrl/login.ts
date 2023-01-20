import { Request, Response } from "express";
import Users from "@models/userModel";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "@utils/generateToken";

const login = async (req: Request, res: Response) => {
  try {
    //client 데이터 가져오기
    const { email, password } = req.body;

    //email 조회
    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ msg: "This account doesn't exists." });

    //password 조회(bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

    const access_token = generateAccessToken({ id: user._id });
    const refresh_token = generateRefreshToken({ id: user._id });

    await Users.findOneAndUpdate({ _id: user._id }, { refresh_token });

    //refresh token쿠키 생성하기(프론트서버로 보내질 쿠키)
    res.cookie("refresh_token", refresh_token, {
      path: "/", //프론트쪽 path
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // day*hour*min*sec*ms //30days
    });

    //성공
    res.status(200).json({
      access_token,
      user: { ...user._doc, password: "" }, //비번빼고 가져오기 //IUer type(with _doc) model에 필요
      msg: "Login success!",
    });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default login;
