import { Response } from "express";
import Users from "@models/userModel";
import { IReqAuth } from "@_types/types";

export const logout = async (req: IReqAuth, res: Response) => {
	try {
		//refresh_token 쿠키 삭제하기
		res.clearCookie("refresh_token", { path: "/" }); //프론트쪽 path

		//성공
		res.status(200).json({
			msg: "Logout success!",
		});
	} catch (err: any) {
		return res.status(500).json({ msg: err.message });
	}
};
