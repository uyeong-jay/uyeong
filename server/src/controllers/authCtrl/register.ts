import { Request, Response } from "express"; //types
import Users from "@models/userModel";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
	try {
		//client 데이터 가져오기
		const { nickname, email, password, cf_password } = req.body;

		//nickname 탐색
		const userNickname = await Users.findOne({ nickname });
		if (userNickname) {
			return res.status(400).json({ msg: "This nickname already exist." });
		}

		//email 탐색
		const userEmail = await Users.findOne({ email });
		if (userEmail) {
			return res.status(400).json({ msg: "This email already exist." });
		}

		//password 암호화 하기
		//- 단방향 해싱(여기선 bcrypt사용)
		const salt = await bcrypt.genSalt(5); //솔트 추가
		const passwordHash = await bcrypt.hash(password, salt); //비번 해싱
		//- 보안 더 강화 하고싶을 땐
		//	- https://st-lab.tistory.com/100 (보안): 비번(+솔트)  > 해시 > 다이제스트(+솔트) > 해시 > 다이제스트

		//가입한 새유저 비번 암화된 데이터
		const newUser = new Users({
			nickname,
			email,
			password: passwordHash,
			cf_password: passwordHash,
		});

		//db에 (위 형식으로)저장
		await newUser.save();

		res.json({ msg: "Join Success!" });
	} catch (err) {
		if (err instanceof Error) return res.status(500).json({ msg: err.message });
	}
};
