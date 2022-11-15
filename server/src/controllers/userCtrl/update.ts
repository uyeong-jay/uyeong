import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Users from "@models/userModel";
import bcrypt from "bcrypt";

export const update = async (req: IReqAuth, res: Response) => {
	try {
		//middleware auth 잘통과 했는지 확인
		if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

		//client 데이터 가져오기
		const { avatar, email, nickname, old_password, new_password } = req.body;

		//email 조회
		const user = await Users.findOne({ email });
		if (!user) return res.status(400).json({ msg: "This account doesn't exists." });

		//password를 바꾸지 않을때
		if (!new_password) {
			//업데이트 하기
			await Users.findOneAndUpdate({ _id: req.user._id }, { avatar, nickname });
		}

		//password를 바꿀때
		if (new_password) {
			//password 조회(bcrypt)
			const isMatch = await bcrypt.compare(old_password, user.password);
			if (!isMatch) return res.status(400).json({ msg: "Old password is incorrect" });

			//password 암호화
			const salt = await bcrypt.genSalt(5); //솔트 추가
			const newPasswordHash = await bcrypt.hash(new_password, salt); //비번 해싱

			//업데이트 하기
			await Users.findOneAndUpdate({ _id: req.user._id }, { avatar, nickname, password: newPasswordHash });
		}

		//성공
		res.status(200).json({ msg: "Update success!" });
	} catch (err: any) {
		return res.status(500).json({ msg: err.message });
	}
};
