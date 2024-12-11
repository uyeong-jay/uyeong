import { Request, Response } from "express";
import Users from "@models/userModel";

const signout = async (req: Request, res: Response) => {
  try {
    const rf_token = req.cookies.refresh_token;

    if (rf_token) {
      //쿠키만 삭제해서 로그아웃이 된 경우 실행되지 않음
      await Users.findOneAndUpdate({ rf_token }, { rf_token: "" });
    }

    res.clearCookie("refresh_token", { path: "/" }); //client path

    //성공
    res.status(200).json({
      msg: "Signed out successfully!",
    });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default signout;
