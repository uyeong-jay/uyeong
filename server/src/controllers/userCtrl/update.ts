import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Users from "@models/userModel";
import bcrypt from "bcrypt";

export const update = async (req: IReqAuth, res: Response) => {
	try {
		//middleware auth 잘통과 했는지 확인
		if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

		//client 데이터 가져오기
		const { avatar, nickname, password } = req.body;

		if (!password) {
			//업데이트 하기
			await Users.findOneAndUpdate({ _id: req.user._id }, { avatar, nickname });
		}

		if (password) {
			//password 암호화
			const salt = await bcrypt.genSalt(5); //솔트 추가
			const passwordHash = await bcrypt.hash(password, salt); //비번 해싱

			//업데이트 하기
			await Users.findOneAndUpdate({ _id: req.user._id }, { avatar, nickname, password: passwordHash });
		}

		//성공
		res.status(200).json({ msg: "Update success!" });
	} catch (err) {
		if (err instanceof Error) return res.status(500).json({ msg: err.message });
	}
};
