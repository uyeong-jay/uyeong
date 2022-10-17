import { Response } from "express";
import Users from "@models/userModel";
import { IReqAuth } from "@_types/types";

export const logout = async (req: IReqAuth, res: Response) => {
	try {
		//refresh_token 쿠키 삭제하기
		res.clearCookie("refresh_token", { path: "/" });

		//해당id 유저 refresh_token 없애기
		await Users.findOneAndUpdate(
			{ _id: req.user?._id },
			{
				refresh_token: "",
			}
		);

		//성공시
		res.status(200).json({ msg: "Logout Success!" });
	} catch (err) {
		if (err instanceof Error) return res.status(500).json({ msg: err.message });
	}
};
