import { Request, Response } from "express";
import Users from "@models/userModel";

const logout = async (req: Request, res: Response) => {
  try {
    //refresh_token 쿠키 삭제하기
    const rf_token = req.cookies.refresh_token;

    if (rf_token) {
      await Users.findOneAndUpdate({ rf_token }, { rf_token: "" });
    }

    res.clearCookie("refresh_token", { path: "/" }); //프론트쪽 path

    //성공
    res.status(200).json({
      msg: "Logout success!",
    });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default logout;
